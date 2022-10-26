package entity

import "gorm.io/gorm"

//////////////////////////////////////////////////////////////////////////////////////
//Room

type Building struct {
	gorm.Model
	Name  string
	Rooms []Room `gorm:"foreignKey:BuildingID"`
}

type ServiceDay struct {
	gorm.Model
	Day   string
	Rooms []Room `gorm:"foreignKey:ServiceDayID"`
}

type Period struct {
	gorm.Model
	Time  string
	Rooms []Room `gorm:"foreignKey:PeriodID"`
}

type Type struct {
	gorm.Model
	Name  string
	Price int
	Rooms []Room `gorm:"foreignKey:TypeID"`
}

type Room struct {
	gorm.Model
	Number string
	Name   string
	//PeriodID ทำหน้าที่เป็น FK
	PeriodID *uint
	Period   Period
	//BuildingID ทำหน้าที่เป็น FK
	BuildingID *uint
	Building   Building
	//DayID ทำหน้าที่เป็น FK
	ServiceDayID *uint
	ServiceDay   ServiceDay
	//TypeID  ทำหน้าที่เป็น FK
	TypeID *uint
	Type   Type
	//EmployeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee
	Booking    []Booking `gorm:"foreignKey:RoomID"`
}
