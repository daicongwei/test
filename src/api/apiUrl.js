export const apiUrl = {
    login: { method: 'POST', url: '/sys/login' },
    logout: { method: 'POST', url: '/sys/logout' },

    userSave: { method: 'POST', url: '/sys/user/save' },
    userList: { method: 'POST', url: '/sys/user/list' },
    userforbidden: { method: 'POST', url: '/sys/user/forbidden' },
    userdel: { method: 'GET', url: '/sys/user/delete/' },
    userpassword: { method: 'POST', url: '/sys/user/password' },

    companyAdd: { method: 'POST', url: '/sys/companyinfo/save' },
    companyList: { method: 'POST', url: '/sys/companyinfo/list' },
    companyupdate: { method: 'POST', url: '/sys/companyinfo/update' },
    companydel: { method: 'GET', url: '/sys/companyinfo/delete/' },
    companyall: { method: 'GET', url: '/sys/companyinfo/selectAll' },

    addtrainuser: { method: 'POST', url: '/train/trainuser/save' },
    trainlist: { method: 'POST', url: '/train/trainuser/list' },
    trainupdate: { method: 'POST', url: '/train/trainuser/update' },
    traindelete: { method: 'GET', url: '/train/trainuser/delete/' },
    traindimission: { method: 'GET', url: '/train/trainuser/dimission/' },

    sysloglist: { method: 'POST', url: '/sys/syslog/list' },

    addcourses: { method: 'POST', url: '/train/course/save' },
    courseslist: { method: 'POST', url: '/train/course/list' },
    coursesremove: { method: 'POST', url: '/train/course/remove/' },
    coursesupdate: { method: 'POST', url: '/train/course/update' },
    coursecataloglist: { method: 'POST', url: '/train/coursecatalog/list' },
    coursecatalogsave: { method: 'POST', url: '/train/coursecatalog/save' },
    coursecatalogupdate: { method: 'POST', url: '/train/coursecatalog/update' },
    coursecatalogdelete: { method: 'GET', url: '/train/coursecatalog/delete/' },
    courselearnCond: { method: 'POST', url: '/train/course/learnCondition' },

    learnCondition: { method: 'GET', url: '/sys/companyinfo/learnCondition' },
    settleaccounts: { method: 'POST', url: '/train/settleaccounts/list' },


    
}