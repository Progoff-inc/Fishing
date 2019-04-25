CREATE TABLE IF NOT EXISTS boats (
	BoatId int(20) PRIMARY KEY AUTO_INCREMENT,
    Type varchar(255) NOT NULL,
    Name varchar(255) NOT NULL,
    Displacement float(10,2) NOT NULL,
    BuildDate datetime DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS banks (
	BankId int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS fishings (
	FishingId int(20) PRIMARY KEY AUTO_INCREMENT,
    BoatId int(20),
    DateStart datetime DEFAULT CURRENT_TIMESTAMP,
    DateFinish datetime,
    
    CONSTRAINT fb_fk FOREIGN KEY(BoatId) REFERENCES boats(BoatId)
);

CREATE TABLE IF NOT EXISTS sailors (
	SailorId int(20) PRIMARY KEY AUTO_INCREMENT,
    FishingId int(20),
    Position varchar(255) NOT NULL,
    Surname varchar(255) NOT NULL,
    Name varchar(255) NOT NULL,
    Address varchar(255) NOT NULL,

    CONSTRAINT fsf_fk FOREIGN KEY(FishingId) REFERENCES fishings(FishingId)
);

CREATE TABLE IF NOT EXISTS fishingbanks (
	FishingId int(20),
    BankId int(20),
    Quality varchar(255) NOT NULL,
    DateStart datetime NOT NULL,
    DateFinish datetime NOT NULL,
    
    CONSTRAINT fbf_fk FOREIGN KEY(FishingId) REFERENCES fishings(FishingId),
    CONSTRAINT fbs_fk FOREIGN KEY(BankId) REFERENCES banks(BankId),
    CONSTRAINT fb_pk PRIMARY KEY(FishingId, BankId)
);

CREATE TABLE IF NOT EXISTS fishingbankfish (
	FishingId int(20),
    BankId int(20),
    FishType varchar(255) NOT NULL,
    Weight float(18,2),
    
    CONSTRAINT ff_fk FOREIGN KEY(FishingId) REFERENCES fishings(FishingId),
    CONSTRAINT ffb_fk FOREIGN KEY(BankId) REFERENCES banks(BankId),
    CONSTRAINT ff_pk PRIMARY KEY(FishingId, BankId, FishType)
);
