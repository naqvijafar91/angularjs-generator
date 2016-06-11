/**
 * Created by jafarnaqvi on 10/06/16.
 */

var generators = require('yeoman-generator');

/*
 * @Note:Steps:
 * 1-Create main module File.
 * 2-Create submodule's module folder,controller and module file.
 * 3-Create routes module and folder,config file.
 * 4-Create app.core module and inject all the dependencies.
 * 5-Prepare bower.json
 * */

module.exports = generators.Base.extend({


    mainModule: function () {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your AngularJs Project Name?',
            default: this.appname // Default to current folder name
        },{
            type: 'input',
            name: 'author',
            message: 'What is your Name dude?',
            default: 'Cool Programmer at Zillion' // Default to current folder name

        }]).then(function (answers) {
            //this.log('app name', answers.name);
            this.name = answers.name;
            this.author=answers.author;
            //this.log(this.destinationRoot());
            this.fs.copyTpl(
                this.templatePath('mainModule.js'),
                this.destinationPath('app/module.js'),
                {name: answers.name}
            );

        }.bind(this));
    },

    countsubmodules: function () {

        return this.prompt([{
            type: 'input',
            name: 'subModulesCount',
            message: 'Please tell me the number of submodules you expect bro',
            default: 0 // Default to current folder name
        }]).then(function (answers) {

            //this.log(this.name);
            this.subModulesCount = answers.subModulesCount;

        }.bind(this));

    },

    prepareSubmoduleName:function(){


        var moduleNames=[];


        for(var i=0;i<this.subModulesCount;i++) {

            var singleQuestion={

                type: 'input',
                name: 'subModulesName'+i,
                message: 'Please tell me the name of submodule '+(i+1),
                default: 'default'+i // Default to current folder name

            };

            moduleNames.push(singleQuestion);


        }


        return this.prompt(moduleNames).then(function (answers) {

            this.subModulesNamesArray=[];

            for(var i=0;i<this.subModulesCount;i++) {

                //this.log(answers['subModulesName'+i]);
                this.subModulesNamesArray.push('app.'+answers['subModulesName'+i]);
                //Create main submodule file
                this.fs.copyTpl(
                    this.templatePath('module.js'),
                    this.destinationPath('app/'+answers['subModulesName'+i]+'/module.js'),
                    {name:'app.'+ answers['subModulesName'+i]}
                );

                //Create default controller file
                this.fs.copyTpl(
                    this.templatePath('controller.js'),
                    this.destinationPath('app/'+answers['subModulesName'+i]+'/controller.js'),
                    {name:'app.'+ answers['subModulesName'+i]}
                );




            }


        }.bind(this));


    },

    routes:function(){

        //Create main submodule file
        this.fs.copyTpl(
            this.templatePath('module.js'),
            this.destinationPath('app/routes/module.js'),
            {name: 'app.routes'}
        );

        //Create default config file
        this.fs.copyTpl(
            this.templatePath('routeConfig.js'),
            this.destinationPath('app/routes/config.js'),
            {name: 'app.routes'}
        );


    },

    core:function(){


        //Create main submodule file
        this.fs.copyTpl(
            this.templatePath('coreModule.ejs'),
            this.destinationPath('app/core/module.js'),
            {name: 'app.core',dependencies:this.subModulesNamesArray}
        );

    },

    bower:function(){


        //Create main submodule file
        this.fs.copyTpl(
            this.templatePath('bower.json.ejs'),
            this.destinationPath('app/bower.json'),
            {name: this.name,author:this.author}
        );

    }

/*    method1: function () {

        var done = this.async();

        setTimeout(function () {

            console.log('Printing inside async task');
            done();
        }, 1000);

        console.log('method 1 just ran');
    },
    method2: function () {
        console.log('method 2 just ran');
    }*/
});