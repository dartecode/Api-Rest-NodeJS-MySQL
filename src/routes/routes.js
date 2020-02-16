const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database/database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees;', (error, rows, fields) => {
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            res.json(err);
        }
    });
});

router.post('/', (req , res) => {
    const { name, salary } = req.body;
    const query = 'INSERT INTO employees(name, salary) VALUES (?,?)';
    mysqlConnection.query(query, [name,salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Employee Saved'});
        }else{
            console.log(err);
        }
    });
});

router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    const query = 'UPDATE employees SET name = ?, salary = ?  WHERE id = ?';
    mysqlConnection.query(query, [name, salary, id], (err, rows, fields) => {
        if(!err){
            res.json({ Status: 'Actualizado con exito'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/delete/:id', (req , res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employees WHERE id = ?';
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err){
            res.json({ Status: 'Eliminado con exito'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;