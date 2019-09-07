from flask import Flask, request, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://ffkuamto:OhmcWQRyqWFMuRTysqP8VCSVaHbssLVx@salt.db.elephantsql.com:5432/ffkuamto"
db = SQLAlchemy(app)

# app.config['MONGO_URI'] = 'mongodb+srv://adiach:pennapps@cluster0-jgwg7.mongodb.net/test?retryWrites=true&w=majority'
# mongo = PyMongo(app)



class FileContents(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    data = db.Column(db.LargeBinary)





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

        #things I need for the tour
        '''
        1. user
        2. school
        3. start point
        4. end point
        5. all points and their corresponding audio files
        '''


        print(request.files)

        print(request.files.getlist('files'))
        fileList = request.files.getlist('files')
        print(request.form)
        fileNameList = []
        for file in fileList:
            print("HIIIIIII")
            print(file.filename)
            # newFile = FileContents(name=file.filename, data=file.read())
            # db.session.add(newFile)
            # db.session.commit()
            # fileNameList.append(file.filename)



        # mongo.db.tour.insert({'id':id, points:[[][][][][]]})

        # print(request.form['files'])
        # print(type(request.form['files']))
        # print(type(request.form))
        # print(request.data)
        return json.dumps({"Hewwo":fileNameList})


    return json.dumps({"uu":"uwuw"})

if __name__ == '__main__':
    app.run(debug=True)