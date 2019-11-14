const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// router.get('/', rejectUnauthenticated, (req, res) => {
//     // Send back user object from the session (previously queried from the database)
//     res.send(req.user);
//   });

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    pool.query('SELECT * FROM "secret" WHERE secrecy_level <= $1;', [req.user.clearance_level])
        .then(results => {
            console.log(results.rows);
            
            res.send(results.rows)
        })
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;