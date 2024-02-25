const test = (req,res) => {
    console.log(req.body);
    if(req.body?.test == 0){
        res.json({message : "Test passed "+ req.body.name});
    }
    else res.json({message : "Test Failed!"});
};

module.exports = test;