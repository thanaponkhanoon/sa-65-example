package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	} 

	// Migrate the schema
	database.AutoMigrate(
		&Employee{},
		&Category{},
		&Unit{},
		&Equipment{},
	)

	db = database

	passwordEmployee1, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	Employee1 := Employee{
		FirstName:     "thna",
		LastName:	"srimeang",
		Email:    "thana@gmail.com",
		Password: string(passwordEmployee1),
	}
	db.Raw("SELECT * FROM employees WHERE email = ?", "thanaponkhanoon1123@gmail.com").Scan(&Employee1)
	passwordEmployee2, err := bcrypt.GenerateFromPassword([]byte("1234512126"), 14)
	Employee2 := Employee{
		FirstName:     "thanathon",
		LastName:	"pongpak",
		Email:    "thanathon@gmail.com",
		Password: string(passwordEmployee2),
	}
	db.Raw("SELECT * FROM employees WHERE email = ?", "thanaponkhanoon1123@gmail.com").Scan(&Employee2)
	passwordEmployee3, err := bcrypt.GenerateFromPassword([]byte("123426"), 14)
	Employee3 := Employee{
		FirstName:     "sukda",
		LastName:	"mama",
		Email:    "sakda@gmail.com",
		Password: string(passwordEmployee3),
	}
	db.Raw("SELECT * FROM employees WHERE email = ?", "thanaponkhanoon1123@gmail.com").Scan(&Employee3)


	// --- Category Data
	electricalappliance := Category{
		Name:  "Electricalappliance",
	}
	db.Model(&Category{}).Create(&electricalappliance)

	stationery := Category{
		Name:  "Stationery",
	}
	db.Model(&Category{}).Create(&stationery)

	furniture := Category{
		Name:  "Furniture",
	}
	db.Model(&Category{}).Create(&furniture)

	// Unit Data
	machine := Unit{
		Name: "Machine",
	}
	db.Model(&Unit{}).Create(&machine)

	stick := Unit{
		Name: "Stick",
	}
	db.Model(&Unit{}).Create(&stick)

	chair := Unit{
		Name: "Chair",
	}
	db.Model(&Unit{}).Create(&chair)

	// equipment 1
	db.Model(&Equipment{}).Create(&Equipment{
		Name: 			"Projector",
		Amount:			10,
		Category:       electricalappliance,
		Unit:			machine,
		Time: time.Now(),
		Employee: 		Employee1,
	})
	// equipment 2
	db.Model(&Equipment{}).Create(&Equipment{
		Name: 			"Whiteboardpen",
		Amount:			15,
		Category:       stationery,
		Unit:			stick,
		Time: time.Now(),
		Employee: 		Employee3,
	})
	// equipment 3
	db.Model(&Equipment{}).Create(&Equipment{
		Name: 			"Chairs",
		Amount:			10,
		Category:       furniture,
		Unit:			chair,
		Time: time.Now(),
		Employee: 		Employee2,
	})
}