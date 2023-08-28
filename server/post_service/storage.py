<<<<<<< HEAD
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
=======
import os
import json

# Всё (абсолютно) здесь может выдать ошибку, поэтому нужно юзать совместно с try-except =)

def write_post(type: str, id: int, content: dict):
    with open(f"{type}/{id}.json", "w") as content_file:
        content_file.write(json.dumps(content))

def read_post(type: str, id: int):
    content = None
    with open(f"{type}/{id}.json", "r") as content_file:
        content = json.loads(content_file.read())
    return content

def delete_post(type: str, id: int):
    os.remove(f"{type}/{id}.json")
>>>>>>> server-dev
