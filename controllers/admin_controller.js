const Users = require('../models/user');

// This function is for assigning Work, and sending some data to it.
module.exports.assignWork = async function(req, res){
    let employe = await Users.find({});

    return res.render('admin',  {
        title : 'Employee-Review-System | Assign Work',
        employe : employe
    });
}

// This function will show the list of employee woking in the company.
module.exports.showEmployeeList = async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error' , 'You are not Authorized !');
        return res.redirect('/users/sign-in');
    }
    if(req.user.isAdmin == false){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/');
    }
    let employeeList = await Users.find({});

    return res.render('employee', {
        title : "Employee-Review-System | Employe-List",
        employes : employeeList
    });
}

// This function will set the reviewer and reviewer.
module.exports.setReviewerAndReviews = async function(req, res){
    try{
        // first checking if the req is made correct or not.
        if(!req.isAuthenticated()){
            // flash messages
            req.flash('success' , 'Please Login !');
            
            return res.redirect('/users/sign-in');
        }else{
            let employee = await Users.findById(req.user.id);
    
            if(employee.isAdmin == false){
                // flash Messages
                req.flash('error' , 'Opps ! Not Authorized ');
                // console.log('User is not admin');
                return res.redirect('/users/sign-in');
            }
        
            else if(req.body.sender == req.body.receiver){
                // flash messages
                // console.log("sender === receiver")
                req.flash('error' , 'Sender and receiver should not be same !');
                return res.redirect('back');
            }
            // After checking all the authentication , part the main part start from here.
            else{
                let sender = await Users.findById(req.body.sender);
                let receiver = await Users.findById(req.body.receiver);
                //console.log(sender + " " + receiver);
                sender.userToReview.push(receiver);
                sender.save();
                receiver.reviewRecivedFrom.push(sender);
                receiver.save();
                // flash Messages
                req.flash('success', 'Task Assigned !');
                return res.redirect('back');
            }
        }
    
        
    }catch(err){
        console.log("Errror in setting up the user " + err);
    }

}
// This function is for making the new Admin
module.exports.newAdmin = async function(req, res){
    try{
        // checking the authentication part.
        if(!req.isAuthenticated()){
            console.log('Please LogIn');
            // flash Messages
            req.flash("success" , 'Please LogIn !');
            return res.redirect('/users/sign-in');
        }
        // Checking for authorization
        if(req.user.isAdmin == false){
            // flash messages
            req.flash('error' , 'You are not Admin !');
            return res.redirect('/');
        }
        // Making the user admin.
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.selectedUser);
            if(!user){
                // flash Messages
                
                return res.redirect('back');
            }
            req.flash('success' , 'New Admin Added');
            user.isAdmin = "true";
            user.save();
            return res.redirect('back');
        }
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// This function is for deleting the employee
module.exports.deleteEmployee = async function(req, res){
    try{
        // Authentication and Authoriztion chekcing
        if(!req.isAuthenticated()){
            // flash Messages
            req.flash('error' , 'Please Login !')
            return res.redirect('users/sign-in');
        }

        if(!req.user.isAdmin){
            // flash Messages
            req.flash('error' , 'You are not admin !')
            return res.redirect('/');
        }
        // Deleting the user.
        let employee = await Users.deleteOne({_id : req.params.id});
        // flash Messages
        req.flash('success' , 'User Deleted!')
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.addEmployee = function(req, res){
    return res.render('addEmployee', {
        title : 'Employee-Review-System | Add Employee'
    });
}