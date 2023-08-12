import json
import os, shutil

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
        print("The ditectory [{}] doesn't exist".format(path + id))
        return False
    shutil.rmtree(path + id)
    return True