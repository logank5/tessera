from flask import Flask, jsonify, make_response, request # Importing the Flask library and some helper functions
import sqlite3 # Library for talking to our database
from datetime import datetime # We'll be working with dates 
from datetime import timedelta # We'll be working with dates 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, create_refresh_token,
    get_jwt_identity, get_jwt, set_access_cookies,
    unset_access_cookies, unset_jwt_cookies
)

app = Flask(__name__) # Creating a new Flask app. This will help us create API endpoints hiding the complexity of writing network code!
CORS(app, supports_credentials=True)

app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_SECRET_KEY'] = 'pikachu'  # Change this!
jwt = JWTManager(app)

# This function returns a connection to the database which can be used to send SQL commands to the database
def get_db_connection():
  conn = sqlite3.connect('../database/tessera.db')
  conn.row_factory = sqlite3.Row
  return conn

@app.route('/events', methods=['GET'])
def get_events():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Start with the base SQL query
    query = 'SELECT * FROM Events'
    params = []
    query_conditions = []
    
    # Check for the 'afterDate' filter
    after_date = request.args.get('afterDate')
    if after_date:
        query_conditions.append('date > ?')
        params.append(after_date)


    before_date = request.args.get('beforeDate')
    if before_date:
        query_conditions.append('date < ?')
        params.append(before_date)
    
  # Check for the 'location' filter
    location = request.args.get('location')
    if location:
        query_conditions.append('location = ?')
        params.append(location)

    # Check for the 'afterDate' filter
    name = request.args.get('name')
    if name:
        query_conditions.append('name = ?')
        params.append(name)

  # Add WHERE clause if conditions are present
    if query_conditions:
      query += ' WHERE ' + ' AND '.join(query_conditions)
    
    # Execute the query with or without the date filter
    cursor.execute(query, params)
    events = cursor.fetchall()
    
    # Convert the rows to dictionaries to make them serializable
    events_list = [dict(event) for event in events]
    
    conn.close()
    
    return jsonify(events_list)

@app.route('/user', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Start with the base SQL query
    query = 'SELECT * FROM Users'
    params = []
    query_conditions = []
    
    
    # Check for the 'afterDate' filter
    email = request.args.get('email')
    if email:
        query_conditions.append('email = ?')
        params.append(email)
   
  # Add WHERE clause if conditions are present
    if query_conditions:
      query += ' WHERE ' + ' AND '.join(query_conditions)
    
    # Execute the query with or without the date filter
    cursor.execute(query, params)
    users = cursor.fetchall()
    
    # Convert the rows to dictionaries to make them serializable
    users_list = [dict(user) for user in users]
    
    conn.close()
    
    return jsonify(users_list)

#A GET endpoint to return all emails in a database so we can sell data to partners
@app.route('/user/emails', methods=['GET'])
def get_emails():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Start with the base SQL query
    cursor.execute('SELECT email FROM Users')
    
    # Execute the query with or without the date filter
    emails = cursor.fetchall()
    
    # Convert the rows to dictionaries to make them serializable
    email_list = [dict(email) for email in emails]
    
    conn.close()
    
    return jsonify(email_list)

#Get Tickets
@app.route('/tickets', methods=['GET'])
def get_tickets():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Start with the base SQL query
    query = 'SELECT * FROM Tickets'
    params = []
    query_conditions = []
    
    # Check for the 'afterDate' filter
    price = request.args.get('price')
    if price:
        query += ' WHERE price > ?'
        params.append(price)
    
  # Add WHERE clause if conditions are present
    
    # Execute the query with or without the date filter
    cursor.execute(query, params)
    tickets = cursor.fetchall()
    
    # Convert the rows to dictionaries to make them serializable
    tickets_list = [dict(ticket) for ticket in tickets]
    
    conn.close()
    
    return jsonify(tickets_list)

#endpoint to create a new user
@app.route('/user', methods=['POST'])
def create_user():
    # Extract email, username, and password from the JSON payload
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')
    confirm_password = request.json.get('confirm_password')

    # Basic validation to ensure all fields are provided
    if not email or not username or not password or not firstname or not lastname or not confirm_password:
        return jsonify({'error': 'All fields (email, username, firstname, lastname, password, and confirm_password) are required.'}), 400
    
    if '@' in username:
        return jsonify({'error':'Invalid username. Username cannot contain "@"'}), 400
    if '@' not in email:
        return jsonify({'error':'Invalid email. Email must contain "@"'}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        if password != confirm_password:
            return jsonify({'message': 'Passwords do not match'}), 404
        
        cursor.execute('INSERT INTO Users (email, username, password_hash, firstname, lastname) VALUES (?, ?, ?, ?, ?)',
                    (email, username, hashed_password, firstname, lastname))
        conn.commit()  # Commit the changes to the database

        # Retrieve the user_id of the newly created user to confirm creation
        cursor.execute('SELECT user_id FROM Users WHERE username = ?', (username,))
        new_user_id = cursor.fetchone()

        conn.close()

        return jsonify({'message': 'User created successfully', 'user_id': new_user_id['user_id']}), 200

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username or email already exists.'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#login endpoint
@app.route('/login', methods=['POST'])
def login():
    # Extract email, username, and password from the JSON payload
    username = request.json.get('username')
    password = request.json.get('password')
    print(username)
    print(password)

    # Basic validation to ensure all fields are provided
    if not username or not password:
        return jsonify({'error': 'All fields (username/email, and password) are required.'}), 400
    
    hashed_password = generate_password_hash(password)


    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        #Gets the users password hash
        cursor.execute('SELECT user_id, username, email, password_hash FROM Users WHERE username = ? OR email = ?', (username, username,))
        payload_values = cursor.fetchone()

        #Get username and email for the payload
        payload = {'user_id': payload_values[0], 'username': payload_values[1], 'email_addr': payload_values[2], 'role': ['ADMIN', 'EVENT_PLANNER', 'DO_NO_SELL']}
        
        
        conn.close()

        

        #print(hashed_password)
        #print(password_hash['password_hash'])

        #Checks if the hash is None (User does not exist)
        if payload_values != None:
          if check_password_hash(payload_values['password_hash'], password):
            #payload
            expires = timedelta(days=1)
            #payload = [payload_values[0], payload_values[1]]
            access_token = create_access_token(identity=payload, expires_delta=expires)
            resp = jsonify({'login': True})
            set_access_cookies(resp, access_token)
            return resp, 200
            # return jsonify({'message': 'Login Successful'}), 200
          else:
            # return jsonify({'login': False}), 401
            return jsonify({'message': 'Login Failed: Invalid password'}), 401
        
        
        return jsonify({'message': 'Login Failed: Username or email does not exist'}), 401
                            
    except Exception as e:
        return jsonify({'message': 'credentials invalid'}), 401
    
# @app.route('/user/update', methods=['PUT'])
# @jwt_required()
# def update_user():
    # Extract email, username, and password from the JSON payload
    old_email = request.json.get('old_email')
    new_email = request.json.get('new_email')
    old_user = request.json.get('old_user')
    new_user = request.json.get('new_user')
    phone = request.json.get('phone')
    
    # Basic validation to ensure all fields are provided
    if (not old_email or not new_email ) or (not old_user or not new_user) or phone:
        return jsonify({'error': 'Please enter your old and new information.'}), 400
        

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Retrieve the user_id of the newly created user to confirm creation
        if ((old_email != None and new_email != None) and (old_user == None and new_user == None)):
          cursor.execute('UPDATE Users SET email = ? WHERE email = ?', (new_email, old_email,))
          conn.commit()  # Commit the changes to the database

        elif ((old_user != None and new_user != None) and (old_email == None and new_email == None)):
          cursor.execute('UPDATE Users SET username = ? WHERE username = ?', (new_user, old_user,))
          conn.commit()  # Commit the changes to the database
        else:
          cursor.execute('UPDATE Users SET email = ?, username = ? WHERE username = ?', (new_email, new_user, old_user,))
          conn.commit()  # Commit the changes to the database
        
        conn.close()

        return jsonify({'message': 'User updated successfully'}), 201

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username or email already exists.'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/user/update/<user_id>', methods=['PUT'])
# @jwt_required()
def update_user(user_id):
    # Extract email, username, and password from the JSON payload
    new_email = request.json.get('new_email')
    new_username = request.json.get('new_username')
    phone = request.json.get('phone')
    avatar = request.json.get('avatar')
    
    # Basic validation to ensure all fields are provided
    if not new_email and not new_username and not phone and not avatar:
        return jsonify({'error': 'Please enter your new information.'}), 400
    
    # jwt = get_jwt()
    # username = jwt['sub']['username']

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Retrieve the user_id of the newly created user to confirm creation
        if (new_email):
          cursor.execute('UPDATE Users SET email = ? WHERE user_id = ?', (new_email, user_id,))
          conn.commit()  # Commit the changes to the database

        if (new_username):
          cursor.execute('UPDATE Users SET username = ? WHERE user_id = ?', (new_username, user_id,))
          conn.commit()  # Commit the changes to the database

        if (phone):
          cursor.execute('UPDATE Users SET phone = ? WHERE user_id = ?', (phone, user_id,))
          conn.commit()  # Commit the changes to the database

        if (avatar):
          cursor.execute('UPDATE Users SET avatar = ? WHERE user_id = ?', (avatar, user_id,))
          conn.commit()  # Commit the changes to the database

        cursor.execute('SELECT user_id, username, email FROM Users WHERE user_id = ?', (user_id,))
        payload_values = cursor.fetchone()
        #Get username and email for the payload
        payload = {'user_id': payload_values[0], 'username': payload_values[1], 'email_addr': payload_values[2], 'role': ['ADMIN', 'EVENT_PLANNER', 'DO_NO_SELL']}
        expires = timedelta(days=1)
        new_access_token = create_access_token(identity=payload, expires_delta=expires)
        resp = jsonify({'update': True})
        print(new_access_token)
        unset_access_cookies(resp)
        set_access_cookies(resp, new_access_token)
        return resp, 200
        
        conn.close()

        return jsonify({'message': 'User updated successfully'}), 200

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username or email already exists.'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#A POST endpoint allowing event creation - maybe you want to build an admin section on your website for admins to create new events
@app.route('/events', methods=['POST'])
def create_event():
    # Extract name, description, date, time and location from the JSON payload
    name = request.json.get('name')
    description = request.json.get('description')
    date = request.json.get('date')
    time = request.json.get('time')
    location = request.json.get('location')

    # Basic validation to ensure all fields are provided
    if not name or not description or not date or not time or not location:
        return jsonify({'error': 'All fields (name, description, date, time, and location) are required.'}), 400


    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Attempt to insert the new user into the Users table
        cursor.execute('INSERT INTO Events (name, description, date, time, location) VALUES (?, ?, ?, ?, ?)',
                       (name, description, date, time, location))
        conn.commit()  # Commit the changes to the database

        # Retrieve the user_id of the newly created user to confirm creation
        cursor.execute('SELECT event_id FROM Events WHERE name = ?', (name,))
        new_event_id = cursor.fetchone()

        conn.close()

        return jsonify({'message': 'Event created successfully', 'event_id': new_event_id['event_id']}), 201

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Event already exists.'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#A PUT endpoint that allows users to change their password (A forgot password type situation)
@app.route('/user/forgot', methods=['PUT'])
def forgot_password():
    # Extract email, username, and password from the JSON payload
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Basic validation to ensure all fields are provided
    if not username or not password:
        return jsonify({'error': 'A field (username, email, password) is required.'}), 400

    hashed_password = generate_password_hash(password)
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        

        # Retrieve the user_id of the newly created user to confirm creation
        cursor.execute('UPDATE Users SET password_hash = ? WHERE username = ? AND email = ?', (hashed_password,username,email,))
        conn.commit()  # Commit the changes to the database
        
        conn.close()

        return jsonify({'message': 'Password updated successfully'}), 201

    except sqlite3.IntegrityError:
        return jsonify({'error': 'User does not exist.'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user/password/<user_id>', methods=['PUT'])
def change_password(user_id):
    # Extract email, username, and password from the JSON payload
    confirm_password = request.json.get('confirm_password')
    old_password = request.json.get('old_password')
    new_password = request.json.get('new_password')
    
    # Basic validation to ensure all fields are provided
    if not confirm_password or not new_password or not old_password:
        return jsonify({'error': 'A field (confirm_password, old_password, new_password) is required.'}), 400

    new_hashed = generate_password_hash(new_password)
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Retrieve the user_id of the newly created user to confirm creation
        cursor.execute('SELECT password_hash FROM Users WHERE user_id = ?', (user_id,))
        password_hash = cursor.fetchone()
      
        if password_hash != None:
          if check_password_hash(password_hash['password_hash'], old_password):
            if new_password == confirm_password:
                cursor.execute('UPDATE Users SET password_hash = ? WHERE user_id = ?', (new_hashed,user_id,))
                conn.commit()  # Commit the changes to the database
                conn.close()
                return jsonify({'message': 'Password updated successfully'}), 200
            else:
                return jsonify({'message': 'Passwords do not match'}), 401
          else:
            return jsonify({'message': 'Password change failed: Incorrect password'}), 404
        
        conn.close()

        return jsonify({'error': 'User does not exist.'}), 409

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# POST endpoint that requires a user_id and an event_id and awards the user a ticket.
@app.route('/tickets', methods=['POST'])
def award_ticket():
    # Extract name, description, date, time and location from the JSON payload
    user_id = request.json.get('user_id')
    event_id = request.json.get('event_id')
    date = datetime.today().strftime('%Y-%m-%d')
    price = request.json.get('price')
    amount = request.json.get('number of tickets')

    # Basic validation to ensure all fields are provided
    if not user_id or not event_id or not date or not price or not amount:
        return jsonify({'error': 'All fields (user_id, event_id, date, price, and amount) are required.'}), 400


    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # loops through to amount to award multiple tickets
        for x in range(amount):
          # Attempt to insert the new ticket into the Tickets table
          cursor.execute('INSERT INTO Tickets (event_id, user_id, purchase_date, price) VALUES (?, ?, ?, ?)',
                        (event_id, user_id, date, price))
          conn.commit()  # Commit the changes to the database

        # Retrieve the ticket_id of the newly created user to confirm creation
        cursor.execute('SELECT ticket_id FROM Tickets WHERE user_id = ?', (user_id,))
        new_ticket_id = cursor.fetchone()

        conn.close()

        return jsonify({'message': 'Ticket added successfully', 'ticket_id': new_ticket_id['ticket_id']}), 201

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Ticket already exists.'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#A DELETE endpoint allowing a user to delete themselves
@app.route('/user', methods=['DELETE'])
def delete_user():
    username = request.json.get('username')
    password = request.json.get('password')
    conn = get_db_connection()
    cursor = conn.cursor()
    # Basic validation to ensure all fields are provided
    if not username or not password:
        return jsonify({'error': 'All fields (username and password) are required.'}), 400
        
    cursor.execute('SELECT username FROM Users WHERE username = ?', (username,))
    user = cursor.fetchone()

    cursor.execute('SELECT password_hash FROM Users WHERE username = ?', (username,))
    hashed_password = cursor.fetchone()


    if user != None:
      if check_password_hash(hashed_password['password_hash'], password):
        # Attempt to insert the new user into the Users table
        cursor.execute('DELETE FROM Users WHERE username = ?', (username,))
        conn.commit()  # Commit the changes to the database
        return jsonify({'message': 'User Successfully Deleted'}), 200
      else:
          return jsonify({'message': 'User not deleted: Incorrect Password'}), 200
          
      
    return jsonify({'message': 'User does not exist.'}), 404

#A POST endpoint to log the user out
@app.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    
    return resp, 200

@app.route('/events/<eventId>', methods=['GET']) 
@jwt_required()
def get_events_details(eventId):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Start with the base SQL query
    cursor.execute('SELECT * FROM Events WHERE event_id = ?', (eventId,))
    
    # Execute the query with or without the date filter
    details = cursor.fetchall()
    
    # Convert the rows to dictionaries to make them serializable
    detail_list = [dict(detail) for detail in details]
    
    conn.close()

    # current_user = get_jwt_identity()
    # return jsonify(logged_in_as=current_user), 200

    # username = get_jwt_identity()

    # if get_jwt_identity():
    #     return jsonify(detail_list) 

    # else:
    #     return jsonify({'Not Logged in'}), 500

    return jsonify(detail_list)

@app.route('/user/logged', methods=['GET']) 
@jwt_required()
def get_user_details():
    conn = get_db_connection()
    cursor = conn.cursor()

    jwt = get_jwt()

    user_id = jwt['sub']['user_id']
    
    # Start with the base SQL query
    cursor.execute('SELECT * FROM Users WHERE user_id = ?', (user_id,))
    
    # Execute the query with or without the date filter
    details = cursor.fetchall()
    
    # Convert the rows to dictionaries to make them serializable
    detail_list = [dict(detail) for detail in details]
    
    conn.close()

    return jsonify(detail_list)



if __name__ == '__main__':
    app.run(debug=True)

