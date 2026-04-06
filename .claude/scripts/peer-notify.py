#!/usr/bin/env python3
"""
peer-notify.py — PostToolUse hook
Fires on Write/Edit. Notifies Zoo via broker HTTP in two cases:
  1. beads.json written → task wrapped (primary trigger)
  2. data.json written with status:done task → fallback trigger
Silent always — never disrupts workflow.
"""
import sys, json, os, urllib.request

BROKER_PORT = os.environ.get('CLAUDE_PEERS_PORT', '7899')

def send_to_zoo(my_peer, zoo_peer, msg):
    payload = json.dumps({'from_id': my_peer, 'to_id': zoo_peer, 'text': msg}).encode()
    try:
        req = urllib.request.Request(
            f'http://127.0.0.1:{BROKER_PORT}/send-message',
            data=payload,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        urllib.request.urlopen(req, timeout=2)
    except Exception:
        pass

def get_peers(pm_dir, zoo_dir):
    zf = os.path.join(zoo_dir, '.peer_id')
    mf = os.path.join(pm_dir, '.peer_id')
    if not os.path.exists(zf) or not os.path.exists(mf):
        return None, None
    return open(zf).read().strip(), open(mf).read().strip()

def resolve_path(file_path):
    if not os.path.isabs(file_path):
        file_path = os.path.join(os.getcwd(), file_path)
    return os.path.normpath(file_path)

def pm_name(pm_dir):
    return os.path.basename(pm_dir).upper().replace('-', '_')

def handle_beads(file_path, pm_dir, zoo_dir):
    zoo_peer, my_peer = get_peers(pm_dir, zoo_dir)
    if not zoo_peer or not my_peer:
        return

    detail = 'task completed'
    try:
        with open(file_path) as f:
            beads = json.load(f)
        if beads:
            b = beads[-1]
            task_id = b.get('task_id', '?')
            outcome = b.get('outcome', 'done')
            summary = (b.get('summary') or '')[:120]
            detail  = f"{task_id} · {outcome}\n{summary}"
    except Exception:
        pass

    msg = f"[PM-{pm_name(pm_dir)}→STATUS]\nstatus: done\n{detail}"
    send_to_zoo(my_peer, zoo_peer, msg)

def handle_data_json(file_path, pm_dir, zoo_dir):
    """Fallback: notify if any task just became status:done"""
    zoo_peer, my_peer = get_peers(pm_dir, zoo_dir)
    if not zoo_peer or not my_peer:
        return

    try:
        with open(file_path) as f:
            data = json.load(f)
        backlog = data.get('backlog', [])
        done_tasks = [t for t in backlog if t.get('status') == 'done']
        if not done_tasks:
            return
        # Use the most recently updated done task
        latest = sorted(done_tasks, key=lambda t: t.get('updated', ''), reverse=True)[0]
        task_id = latest.get('id', '?')
        title   = (latest.get('title') or '')[:100]
    except Exception:
        return

    msg = f"[PM-{pm_name(pm_dir)}→STATUS]\nstatus: done\n{task_id} · {title}"
    send_to_zoo(my_peer, zoo_peer, msg)

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        print('{"continue":true}')
        return

    file_path = (data.get('tool_input') or {}).get('file_path', '')
    if not file_path:
        print('{"continue":true}')
        return

    abs_path = resolve_path(file_path)
    pm_dir   = os.path.dirname(abs_path)
    zoo_dir  = os.path.dirname(os.path.dirname(pm_dir))

    if 'beads.json' in abs_path:
        handle_beads(abs_path, pm_dir, zoo_dir)
    elif 'data.json' in abs_path:
        handle_data_json(abs_path, pm_dir, zoo_dir)

    print('{"continue":true}')

main()
