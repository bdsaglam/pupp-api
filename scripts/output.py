import json

cloud_params = dict()
with open('./.build/stack.toml', 'r') as f:
    for line in f:
        line = line.strip('\n')
        key, value = line.split(' = ')
        value = value.strip('"');
        cloud_params[key] = value
        

with open('./.build/stack.json', 'w') as f:
    json.dump(cloud_params,f)