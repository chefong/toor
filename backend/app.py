from flask import Flask, request, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://adiach:pennapps@cluster0-jgwg7.mongodb.net/test?retryWrites=true&w=majority'
mongo = PyMongo(app)
CORS(app)
@app.route('/', methods=['GET','POST'])
def main():
    return json.dumps({"Error": "Hello backend ppl"})
@app.route('/point', methods=['GET', 'POST'])
def point():
    return json.dumps({"hi":"bye"})

@app.route('/search/<location>', methods=['GET','POST'])
def getLocation(location):
    return json.dumps({"Error": "caught"})

@app.route('/tour/<id_>',  methods=['GET','POST'])
def getTour(id_):
    return json.dumps({"Error":"meme"})

@app.route('/submitTour', methods=['GET','POST'])
def submitTour():

    if request.method == 'POST':

        print(request.files)

        print(request.files.getlist('files'))
        print(request.form)
        # print(request.form['files'])
        # print(type(request.form['files']))
        # print(type(request.form))
        # print(request.data)
        return json.dumps({"Hewwo":"hewwo"})


    return json.dumps({"uu":"uwuw"})

if __name__ == '__main__':
    app.run(debug=True)