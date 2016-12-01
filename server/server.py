from flask import Flask, url_for, jsonify, json, request
from flask_cors import CORS
from db import Database
from pprint import pprint
app = Flask(__name__)
CORS(app)

db = Database()

@app.route('/users', methods = ['GET'])
def get_users():
    result = db.query("SELECT * FROM User")
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/user/<username>', methods = ['GET'])
def get_user_by_username(username):
    sql = "SELECT * FROM User WHERE Username = '{0}'".format(username)
    pprint(sql)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/user/email/<email>', methods = ['GET'])
def get_user_by_email(email):
    sql = "SELECT * FROM User WHERE GTEmail = '{0}'".format(email)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/user/login', methods = ['POST'])
def login():
    data = request.json
    sql = "SELECT * FROM User WHERE Username = %(Username)s AND Password = %(Password)s"
    result = db.query(sql, data)
    if len(result) > 0:
        resp = jsonify(result)
        resp.status_code = 200
    else:
        resp = jsonify({'error': 'Username or password incorrect.'})
        resp.status_code = 401
    return resp

@app.route('/projects', methods = ['GET'])
def get_projects():
    sql = "SELECT * FROM Project"
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/projects/applicants', methods = ['GET'])
def get_projects_by_num_applicants():
    sql = """
        SELECT p.ProjectName, COUNT(*) AS 'Applicants' FROM Project AS p
        INNER JOIN Application AS a ON p.ProjectName = a.ProjectName
        GROUP BY p.ProjectName
        ORDER BY COUNT(*) DESC
        LIMIT 10
    """
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/project/<project_name>', methods = ['GET'])
def get_project_by_name(project_name):
    sql = "SELECT * FROM Project WHERE ProjectName = '{0}'".format(project_name)
    result = db.query(sql, project_name)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/courses', methods = ['GET'])
def get_courses():
    sql = "SELECT * FROM Course"
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/course/<course_name>', methods = ['GET'])
def get_course_by_name(course_name):
    sql = "SELECT * FROM Course WHERE CourseName = '{0}'".format(course_name)
    result = db.query(sql, (course_name))
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/course/number/<course_number>', methods = ['GET'])
def get_course_by_number(course_number):
    sql = "SELECT * FROM Course WHERE CourseNumber = '{0}'".format(course_number)
    result = db.query(sql, (course_number))
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/projects/courses', methods = ['POST'])
def get_projects_and_courses():
    data = request.json
    pprint(data)
    projects_only = False
    if 'major' in data or 'year' in data:
        projects_only = True
    if projects_only:
        sql = "SELECT t.ProjectName AS 'Name', 'Project' AS 'Type' FROM Project AS t"
        first_where = True
        if 'major' in data:
            sql += """ WHERE t.ProjectName IN
                    (SELECT p1.ProjectName FROM Project AS p1
                    INNER JOIN Requirement AS r1 ON p1.ProjectName = r1.ProjectName
                    WHERE (r1.Requirement = '{0}'))""".format(data['major'])
            first_where = False
        if 'year' in data:
            if first_where:
                sql += " WHERE"
            else:
                sql += " AND"
            sql += """ t.ProjectName IN
                    (SELECT p2.ProjectName FROM Project AS p2
                    INNER JOIN Requirement AS r2 ON p2.ProjectName = r2.ProjectName
                    WHERE (r2.Requirement = '{0}'))""".format(data['year'])
            first_where = False
        if 'designation' in data:
            if first_where:
                sql += " WHERE"
            else:
                sql += " AND"
            sql += """ t.ProjectName IN
                    (SELECT p3.ProjectName FROM Project AS p3
                    WHERE p3.Designation = '{0}')""".format(data['designation'])
            first_where = False
        if 'title' in data:
            if first_where:
                sql += " WHERE"
            else:
                sql += " AND"
            sql += """ t.ProjectName IN
                    (SELECT p4.ProjectName FROM Project AS p4
                    WHERE p4.ProjectName LIKE '%{0}%')""".format(data['title'])
            first_where = False
        if 'categories' in data:
            if first_where:
                sql += " WHERE"
            else:
                sql += " AND"
            sql += " ("
            for index, category in enumerate(data['categories']):
                if index != 0:
                    sql += ' OR'
                sql += """ t.ProjectName IN
                        (SELECT p5.ProjectName From Project AS p5
                        INNER JOIN ProjectCategory AS c5 ON p5.ProjectName = c5.ProjectName
                        WHERE (c5.CategoryName = '{0}'))""".format(category)
            sql += ")"

    else:
        project_block = "SELECT p.ProjectName AS Name, 'Project' AS 'Type' FROM Project AS p"
        course_block = "SELECT c.CourseName AS Name, 'Course' AS 'Type' FROM Course AS c"
        first_where = True
        if 'title' in data:
            project_block += """ WHERE p.ProjectName IN
                (SELECT p1.ProjectName FROM Project AS p1
                WHERE p1.ProjectName LIKE '%{0}%')""".format(data['title'])
            course_block +=  """ WHERE c.CourseName IN
                (SELECT c1.CourseName FROM Course AS c1
                WHERE c1.CourseName LIKE '%{0}%')""".format(data['title'])
            first_where = False
        if 'designation' in data:
            if first_where:
                project_block += " WHERE"
                course_block += " WHERE"
            else:
                project_block += " AND"
                course_block += " AND"
            project_block += """ p.ProjectName IN
                (SELECT p2.ProjectName FROM Project AS p2
                WHERE p2.Designation = '{0}')""".format(data['designation'])
            course_block +=  """ c.CourseName IN
                (SELECT c2.CourseName FROM Course AS c2
                WHERE c2.Designation = '{0}')""".format(data['designation'])
            first_where = False
        if 'categories' in data:
            if first_where:
                project_block += " WHERE"
                course_block += " WHERE"
            else:
                project_block += " AND"
                course_block += " AND"
            project_block += " ("
            course_block += " ("
            for index, category in enumerate(data['categories']):
                if index != 0:
                    project_block += ' OR'
                    course_block += ' OR'
                project_block += """ p.ProjectName IN
                        (SELECT p3.ProjectName From Project AS p3
                        INNER JOIN ProjectCategory AS pc3 ON p3.ProjectName = pc3.ProjectName
                        WHERE pc3.CategoryName = '{0}')""".format(category)
                course_block += """ c.CourseName IN
                        (SELECT c3.CourseName From Course AS c3
                        INNER JOIN CourseCategory AS cc3 ON c3.CourseNumber = cc3.CourseNumber
                        WHERE cc3.CategoryName = '{0}')""".format(category)
            project_block += ")"
            course_block += ")"

        sql = "SELECT Name, Type FROM (" + project_block + " UNION " + course_block + ") AS t ORDER BY Name"
    result = db.query(sql)
    resp = jsonify(result)
    resp.headers.add('Access-Control-Allow-Origin', '*')
    resp.headers.add('Access-Control-Allow-Methods', '*')
    resp.status_code = 200
    return resp

@app.route('/designations', methods = ['GET'])
def get_designations():
    sql = "SELECT * FROM Designation ORDER BY Name"
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/majors', methods = ['GET'])
def get_majors():
    sql = "SELECT * FROM Major ORDER BY MajorName"
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/categories', methods = ['GET'])
def get_categories():
    sql = "SELECT * FROM Category ORDER BY CategoryName"
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/department/<major_name>', methods=['GET'])
def get_department_by_major(major_name):
    sql = "SELECT DeptName FROM Major WHERE MajorName = '{0}'".format(major_name)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/course/categories/<course_number>', methods = ['GET'])
def get_course_categories_by_course_number(course_number):
    sql = "SELECT CategoryName FROM CourseCategory WHERE CourseNumber = '{0}'".format(course_number)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/project/categories/<project_name>', methods = ['GET'])
def get_project_categories_by_project_name(project_name):
    sql = "SELECT CategoryName FROM ProjectCategory WHERE ProjectName = '{0}'".format(project_name)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/project/requirements/<project_name>', methods = ['GET'])
def get_requirements_by_project_name(project_name):
    sql = "SELECT Requirement FROM Requirement WHERE ProjectName = '{0}'".format(project_name)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/application/<username>', methods = ['GET'])
def get_applications_by_username(username):
    sql = "SELECT * FROM Application WHERE Username = '{0}'".format(username)
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/application/<username>/<project_name>', methods = ['POST'])
def update_application_status(username, project_name):
    data = request.json
    sql = "UPDATE Application SET Status = %s WHERE Username = %s AND ProjectName = %s"
    result = db.query(sql, (data['Status'], username, project_name))
    sql = "SELECT * FROM Application WHERE Username = %s AND ProjectName = %s"
    result = db.query(sql, (username, project_name))
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/application/<username>/<project_name>', methods = ['GET'])
def get_applications_by_username_and_project_name(username, project_name):
    sql = "SELECT * FROM Application WHERE Username = %s AND ProjectName = %s"
    result = db.query(sql, (username, project_name))
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/applications', methods = ['GET'])
def get_applications():
    sql = "SELECT * FROM Application INNER JOIN User ON Application.Username = User.Username ORDER BY ProjectName"
    result = db.query(sql)
    resp = jsonify(result)
    resp.status_code = 200
    return resp

@app.route('/user/<username>/edit', methods = ['POST'])
def edit_user(username):
    data = request.json
    if 'Year' not in data:
        data['Year'] = None
    if 'Major' not in data:
        data['Major'] = None
    sql = "UPDATE User SET Major=%s, Year=%s WHERE Username=%s"
    result = db.query(sql, (data['Major'], data['Year'], username))
    if len(result) > 0:
        resp = jsonify({'success': True})
        resp.status_code = 200
    else:
        resp = jsonify({'success': False})
        resp.status_code = 401
    return resp

@app.route('/application/create', methods = ['POST'])
def apply_for_project():
    data = request.json
    sql = """
        SET @username = %(Username)s;
        SET @projectname = %(ProjectName)s;

        SELECT u.Major, u.Year, m.DeptName INTO @Major, @Year, @Department FROM User AS u
        INNER JOIN Major AS m ON u.Major = m.MajorName
        WHERE u.Username = @username;

        SELECT COUNT(*) INTO @Requirements FROM Requirement
        WHERE ProjectName = @projectname;

        SELECT COUNT(*) INTO @FulfilledRequirements FROM Requirement
        WHERE ProjectName = @projectname
        AND (Requirement LIKE @Major OR Requirement LIKE @Year OR Requirement LIKE @Department);

        SELECT @Requirements, @FulfilledRequirements, @Requirements = @FulfilledRequirements AS 'AbleToApply';
    """
    result = db.query(sql, data, multi=True)
    if result[0]['AbleToApply'] == 0:
        resp = jsonify({'error': 'User does not meet the project requirements.'})
        resp.status_code = 401
        return resp

    sql = "INSERT INTO Application (Username, ProjectName, Date, Status) VALUES (%(Username)s, %(ProjectName)s, %(Date)s, %(Status)s)"
    result = db.query(sql, data)
    resp = jsonify(result)
    resp.status_code = 200
    return resp


if __name__ == '__main__':
    app.run(port=8000, debug=True, threaded=True)
