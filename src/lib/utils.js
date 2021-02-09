module.exports = {
    age(timestamp) {
        
            const today = new Date()
            const birthDate = new Date(timestamp)
        
        
            let age = today.getFullYear() - birthDate.getFullYear()
        
            const month = today.getMonth() - birthDate.getMonth()
        
            if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
                age = age - 1
            }
        
            return age
        
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`

        }
    },

    graduation(type) {
        
        const graduations = {
            medio: 'Ensino Médio Completo',
            superior: 'Ensino Superior Completo',
            mestre: 'Mestrado',
            doutor: 'Doutorado',
        }

        return graduations[type] || graduations.default
    },

    grade(type) {
        const grades = {
            ef5: "5º Ano do Ensino Fundamental",
            ef6: "6º Ano do Ensino Fundamental",
            ef7: "7º Ano do Ensino Fundamental",
            ef8: "8º Ano do Ensino Fundamental",
            ef9: "9º Ano do Ensino Fundamental",
            em1: "1º Ano do Ensino Médio",
            em2: "2º Ano do Ensino Médio",
            em3: "3º Ano do Ensino Médio",
        }
        return grades[type] || grades.default
    },
}