/*jshint ignore: start*/
const users = [{
    id: 1,
    name: 'Sai',
    schoolId: 345
}, {
    id: 2,
    name: 'Katie',
    schoolId: 123
}];

const grades = [{
    id: 1,
    schoolId: 345,
    grade: 85
}, {
    id: 2,
    schoolId: 123,
    grade: 85
},
{
    id: 3,
    schoolId: 345,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        let user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let avg = 0;

        if(grades.length > 0){
            avg = grades.map((grade) => grade.grade).reduce((a, b) => a + b ) / grades.length;
        }

        return `${user.name} has a ${avg} in class`;
    });
};

const getStatusAlt = async (userId) => {
    let user = await getUser(userId);
    let gardes = await getGrades(user.schoolId);

    let avg = 0;

        if(grades.length > 0){
            avg = grades.map((grade) => grade.grade).reduce((a, b) => a + b ) / grades.length;
        }

        return `${user.name} has a ${avg} in class`;
};

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => console.log(e));
// getStatus(1).then((user) => console.log(user)).catch((e) => console.log(e));

/*jshint ignore: end*/