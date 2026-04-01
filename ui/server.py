#!/usr/bin/env python3

import json
import os
import threading
import time
from pathlib import Path

from flask import Flask, Response, abort, jsonify, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).parent.parent
DIST_DIR = Path(__file__).parent / "dist"
INDEX_FILE = DIST_DIR / "index.html"
AVATAR_DIR = Path(__file__).parent / "avatars"
SHARED_SKILLS_DIR = BASE_DIR / ".claude" / "skills"
PORT = int(os.environ.get("ZOO_PORT", "8765"))

VALID_STATUSES = {"todo", "scoped", "doing", "review", "blocked", "done"}
REQUIRED_TASK_FIELDS = {"id", "title", "status"}


def validate_task(item):
    """Validate a single task item. Returns error string or None."""
    if not isinstance(item, dict):
        return "task must be an object"
    missing = REQUIRED_TASK_FIELDS - set(item.keys())
    if missing:
        return f"missing required fields: {', '.join(sorted(missing))}"
    if item.get("status") and item["status"] not in VALID_STATUSES:
        return f"invalid status '{item['status']}', must be one of: {', '.join(sorted(VALID_STATUSES))}"
    return None


def validate_repo_data(data):
    """Validate incoming repo data. Returns list of error strings."""
    errors = []
    if not isinstance(data, dict):
        return ["data must be an object"]
    for section in ("backlog", "archive"):
        items = data.get(section, [])
        if not isinstance(items, list):
            errors.append(f"'{section}' must be an array")
            continue
        for i, item in enumerate(items):
            err = validate_task(item)
            if err:
                errors.append(f"{section}[{i}]: {err}")
    return errors

REPOS = {
    "ads": {
        "path": BASE_DIR / "projects" / "ads" / "data.json",
        "root": BASE_DIR / "projects" / "ads",
        "skills_dir": BASE_DIR / "projects" / "ads" / ".claude" / "skills",
        "color": "#6aa9ff",
    },
    "research": {
        "path": BASE_DIR / "projects" / "research" / "data.json",
        "root": BASE_DIR / "projects" / "research",
        "skills_dir": BASE_DIR / "projects" / "research" / ".claude" / "skills",
        "color": "#7adf9c",
    },
    "builder": {
        "path": BASE_DIR / "projects" / "builder" / "data.json",
        "root": BASE_DIR / "projects" / "builder",
        "skills_dir": BASE_DIR / "projects" / "builder" / ".claude" / "skills",
        "color": "#f2a65a",
    },
    "academic": {
        "path": BASE_DIR / "projects" / "academic" / "data.json",
        "root": BASE_DIR / "projects" / "academic",
        "skills_dir": BASE_DIR / "projects" / "academic" / ".claude" / "skills",
        "color": "#d8a8ff",
    },
    "albus-fe": {
        "path": BASE_DIR / "projects" / "albus-fe" / "data.json",
        "root": BASE_DIR / "projects" / "albus-fe",
        "skills_dir": BASE_DIR / "projects" / "albus-fe" / ".claude" / "skills",
        "color": "#7af2b5",
    },
    "phuonghuyen-workspace": {
        "path": BASE_DIR / "projects" / "phuonghuyen-workspace" / "data.json",
        "root": BASE_DIR / "projects" / "phuonghuyen-workspace",
        "skills_dir": BASE_DIR / "projects" / "phuonghuyen-workspace" / ".claude" / "skills",
        "color": "#7ac5f2",
    },
    "clare-htl-front": {
        "path": BASE_DIR / "projects" / "clare-htl-front" / "data.json",
        "root": BASE_DIR / "projects" / "clare-htl-front",
        "skills_dir": BASE_DIR / "projects" / "clare-htl-front" / ".claude" / "skills",
        "color": "#f27a7a",
    },
    "zoo-dev": {
        "path": BASE_DIR / "projects" / "zoo-dev" / "data.json",
        "root": BASE_DIR / "projects" / "zoo-dev",
        "skills_dir": BASE_DIR / "projects" / "zoo-dev" / ".claude" / "skills",
        "color": "#f2e85a",
    },
}


def load_repo_data(repo_name):
    path = REPOS[repo_name]["path"]
    if not path.exists():
        return {"backlog": [], "archive": []}
    return json.loads(path.read_text(encoding="utf-8"))


def save_repo_data(repo_name, data):
    path = REPOS[repo_name]["path"]
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def normalize_repo(repo_name):
    data = load_repo_data(repo_name)
    for item in data.get("backlog", []):
        item["repo"] = repo_name
    for item in data.get("archive", []):
        item["repo"] = repo_name
    return data


def denormalize_item(item):
    return {k: v for k, v in item.items() if k != "repo"}


@app.route("/")
def index():
    return send_file(INDEX_FILE)


@app.route("/assets/<path:filename>")
def assets(filename):
    asset_path = (DIST_DIR / "assets" / filename).resolve()
    try:
        asset_path.relative_to((DIST_DIR / "assets").resolve())
    except ValueError:
        abort(404)
    if not asset_path.exists() or not asset_path.is_file():
        abort(404)
    return send_file(asset_path)


@app.route("/avatars/<path:filename>")
def avatar(filename):
    avatar_path = (AVATAR_DIR / filename).resolve()
    try:
        avatar_path.relative_to(AVATAR_DIR.resolve())
    except ValueError:
        abort(404)
    if not avatar_path.exists() or not avatar_path.is_file():
        abort(404)
    return send_file(avatar_path)


@app.route("/api/repos", methods=["GET"])
def get_repos():
    return jsonify(
        {
            name: {
                "root": str(info["root"]),
                "color": info["color"],
            }
            for name, info in REPOS.items()
        }
    )


@app.route("/api/data", methods=["GET"])
def get_all_data():
    return jsonify({name: normalize_repo(name) for name in REPOS})


@app.route("/api/data/<repo_name>", methods=["GET"])
def get_repo_data(repo_name):
    if repo_name not in REPOS:
        return jsonify({"error": "Unknown repo"}), 404
    return jsonify(normalize_repo(repo_name))


@app.route("/api/data/<repo_name>", methods=["PUT"])
def update_repo_data(repo_name):
    if repo_name not in REPOS:
        return jsonify({"error": "Unknown repo"}), 404

    incoming = request.json or {}
    data = {
        "backlog": [denormalize_item(item) for item in incoming.get("backlog", [])],
        "archive": [denormalize_item(item) for item in incoming.get("archive", [])],
    }

    errors = validate_repo_data(data)
    if errors:
        return jsonify({"error": "Validation failed", "details": errors}), 400

    save_repo_data(repo_name, data)
    return jsonify({"status": "ok"})


@app.route("/api/skills", methods=["GET"])
def get_skills():
    result = {}
    for repo_name, info in REPOS.items():
        skills_dir = info["skills_dir"]
        if not skills_dir.exists():
            continue
        skills = []
        for skill_file in sorted(skills_dir.glob("*/SKILL.md")):
            skill_name = skill_file.parent.name
            skills.append(
                {
                    "name": skill_name.replace("-", " ").replace("_", " "),
                    "file": f"{skill_name}/SKILL.md",
                    "path": str(skill_file),
                }
            )
        if skills:
            result[repo_name] = skills

    shared_skills = []
    if SHARED_SKILLS_DIR.exists():
        for skill_file in sorted(SHARED_SKILLS_DIR.glob("*/SKILL.md")):
            skill_name = skill_file.parent.name
            shared_skills.append(
                {
                    "name": skill_name.replace("-", " ").replace("_", " "),
                    "file": f"{skill_name}/SKILL.md",
                    "path": str(skill_file),
                }
            )
    if shared_skills:
        result["shared"] = shared_skills

    return jsonify(result)


@app.route("/api/file")
def get_file():
    path = request.args.get("path", "")
    if not path:
        return jsonify({"error": "No path provided"}), 400

    file_path = Path(path)
    try:
        resolved = file_path.resolve()
        resolved.relative_to(BASE_DIR.resolve())
    except (ValueError, OSError):
        return jsonify({"error": "Access denied"}), 403

    if not file_path.exists() or not file_path.is_file():
        return jsonify({"error": "File not found"}), 404

    try:
        return jsonify({"content": file_path.read_text(encoding="utf-8")})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500



# --- SSE real-time auto-sync ---

file_events = []  # list of (threading.Event, [repo_name_holder])


def _file_watcher():
    """Poll mtime of all repo JSON files every 1.5s and notify SSE clients."""
    last_mtimes = {}
    for name, info in REPOS.items():
        try:
            last_mtimes[name] = info["path"].stat().st_mtime
        except OSError:
            last_mtimes[name] = 0

    while True:
        time.sleep(1.5)
        for name, info in REPOS.items():
            try:
                mtime = info["path"].stat().st_mtime
            except OSError:
                continue
            if mtime != last_mtimes.get(name, 0):
                last_mtimes[name] = mtime
                for evt, holder in list(file_events):
                    holder.append(name)
                    evt.set()


_watcher_thread = threading.Thread(target=_file_watcher, daemon=True)
_watcher_thread.start()


@app.route("/api/events")
def sse_events():
    def stream():
        evt = threading.Event()
        holder = []
        client = (evt, holder)
        file_events.append(client)
        try:
            last_heartbeat = time.time()
            while True:
                triggered = evt.wait(timeout=5)
                if triggered:
                    while holder:
                        repo_name = holder.pop(0)
                        yield f"data: {repo_name}\n\n"
                    evt.clear()
                now = time.time()
                if now - last_heartbeat >= 30:
                    yield ": heartbeat\n\n"
                    last_heartbeat = now
        except GeneratorExit:
            pass
        finally:
            if client in file_events:
                file_events.remove(client)

    return Response(
        stream(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


if __name__ == "__main__":
    print(f"Starting open-zoo UI at http://localhost:{PORT}")
    app.run(port=PORT, debug=True)
