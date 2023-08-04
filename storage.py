import json
import os

def store(path, id, value):
    if not os.path.exists(path + id):
        os.mkdir(path + id)
    with open(path + id + "/content.json", 'w') as content:
        content.write(json.dumps(value))
    
def read(path, id):
    if not os.path.exists(path + id):
        return None
    value = ""
    with open(path + id + "/content.json", 'r') as content:
        value = content.read()
    return json.loads(value)

def delete(path, id):
    if not os.path.exists(path + id):
        return False
    os.remove(path + id)