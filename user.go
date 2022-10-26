package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model

	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Password  string

	Equipment  []Equipment  `gorm:"foreignKey:EmployeeID"`
	BorrowList []BorrowList `gorm:"foreignKey:EmployeeID"`
	Users      []User       `gorm:"foreignKey:EmployeeID"`
	//1 employee บันทึกได้หลายห้อง
	Rooms []Room `gorm:"foreignKey:EmployeeID"`
	Bills []Bill `gorm:"foreignKey:EmployeeID"`
}

// //////////////////////////////////////////////////////////////////////////////////////
// ตาราง User
type User struct {
	gorm.Model

	NamePrefixID *uint
	NamePrefix   NamePrefix `gorm:"references:ID"`

	FirstName string
	LastName  string

	EmployeeID *uint
	Employee   Employee `gorm:"references:ID"`

	BirthDay       time.Time
	Identification string `gorm:"uniqueIndex"`
	Email          string `gorm:"uniqueIndex"`
	Password       string `json:"-"`

	GenderID *uint
	Gender   Gender `gorm:"references:ID"`

	Mobile  string `gorm:"uniqueIndex"`
	Address string

	ProvinceID *uint
	Province   Province

	BorrowList []BorrowList `gorm:"foreignKey:MemberID"`
	Bookings   []Booking    `gorm:"foreignKey:UserID"`
	Booking    []Booking    `gorm:"foreignKey:MemberID"`
}

// ตาราง Gender
type Gender struct {
	gorm.Model
	GenderName string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:GenderID"`
}

// ตาราง Province
type Province struct {
	gorm.Model
	ProvinceName string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:ProvinceID"`
}

// ตาราง NamePrefix
type NamePrefix struct {
	gorm.Model
	PrefixName string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:NamePrefixID"`
}
