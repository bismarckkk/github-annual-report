from gevent import monkey

monkey.patch_all()
from flask import Flask, request, abort
from flask_cors import cross_origin
import requests
from gevent.pywsgi import WSGIServer


app = Flask(__name__)
client_id = ''
client_secret = ''
code_uri = 'https://github.com/login/oauth/access_token'


@app.route('/code2token')
@cross_origin()
def code2token():
    code = request.args.get('code')
    res = requests.post(code_uri, data={'client_id': client_id, 'client_secret': client_secret, 'code': code},
                        headers={'Accept': 'application/json'})
    res = res.json()
    if "access_token" in res:
        return res['access_token']
    else:
        return 'error'


if __name__ == '__main__':
    http_server = WSGIServer(('0.0.0.0', 8013), app)
    http_server.serve_forever()
