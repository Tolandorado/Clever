import requests

r = requests.post("http://192.168.1.98:5000/users/api/create", {"username": "test_user", "password": "pass"})
print(r.text)
r = requests.get("http://192.168.1.98:5000/users/api/get")
print(r.text)
r = requests.delete("http://192.168.1.98:5000/users/api/delete/1")
print(r.text)