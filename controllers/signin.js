const handleSignin = (req, res, db, bcrypt) => {
      const {email,password} = req.body;
      db.select('email','hash').from('login').where({email})
        .then(data => {
          const isValid = bcrypt.compareSync(password, data[0].hash.trim());   // In database, hash is initialised as char array of length 100. So, we need to trim it as it will have empty spaces to complete the array lenght to 100
          if(isValid){
            return db.select('*').from('users').where({email})
                    .then(user => {
                      res.json(user[0])
                       })
                    .catch(err => res.status(400).json('unable to get user'))    
                     }
           else
              res.status(400).json('wrong credentials1')    // Wrong passsword
          })
        .catch(err => res.status(400).json('wrong credentials2'))   // Wrong Email Id
}

module.exports = {
  handleSignin: handleSignin
};