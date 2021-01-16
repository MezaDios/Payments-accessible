CREATE OR REPLACE DATABASE ng_Control;

USE ng_Control;

CREATE OR REPLACE TABLE users
(
    id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    secondSurname VARCHAR(50),
    telephone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    userType INT(1),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE TABLE userTypes
(
    id INT(1) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL
);

CREATE OR REPLACE TABLE debts
(
    id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    concept VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    creationDate DATE NOT NULL
);

CREATE OR REPLACE TABLE debtDetails
(
    id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_debt INT(5) NOT NULL,
    debtor INT(5) NOT NULL
);

CREATE OR REPLACE TABLE payments
(
    id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_debt INT(5) NOT NULL,
    id_user INT(5) NOT NULL,
    amount INT(5) NOT NULL,
    paymentDate DATE NOT NULL
);

ALTER TABLE users add foreign key(userType) references userTypes(id);
ALTER TABLE payments add foreign key(id_debt) references debts(id);
ALTER TABLE payments add foreign key(id_user) references users(id);
ALTER TABLE debtDetails add foreign key(debtor) references users(id);
ALTER TABLE debtDetails add foreign key(id_debt) references debts(id);

INSERT INTO ng_control.usertypes(name)VALUES('Administrator');

INSERT INTO ng_control.usertypes(name)VALUES('Debtor');

INSERT INTO ng_control.users
    (name, surname, telephone, email, password, userType, createdAt)
VALUES
    ('Ex.', 'Ex.', '1234554321', 'ex@dom', 'qweRty789', '1', '2019-06-13 16:25:01');

INSERT INTO ng_control.users
    (name, surname, secondSurname, telephone, email, password, userType, createdAt)
VALUES
    ('Ismael', 'Meza', 'Rodríguez', '3121210322', 'ismael_meza@ucol.mx', '123', '1', '2019-06-13 16:23:56');

INSERT INTO ng_control.debts
    (concept, amount, creationDate)
VALUES
    ('Papitas', '10', '2019-06-13');

INSERT INTO ng_control.debtdetails
    (id_debt, debtor)
VALUES
    ('1', '2');

INSERT INTO ng_control.payments
    (id_debt, id_user, amount, paymentDate)
VALUES
    ('1', '2', '10', '2019-06-13');

DELIMITER $$

	CREATE OR REPLACE FUNCTION getTotalDebt(id_user INT)
	RETURNS DECIMAL
		BEGIN
			RETURN (SELECT SUM(debts.amount) FROM debts JOIN debtdetails ON debts.id = debtdetails.id_debt
			WHERE debtdetails.debtor = id_user);
		END$$

DELIMITER ;

DELIMITER $$

	CREATE OR REPLACE FUNCTION getTotalPaids(id_user INT)
	RETURNS DECIMAL
		BEGIN
			RETURN (SELECT SUM(payments.amount) FROM payments WHERE payments.id_user = id_user);
		END$$

DELIMITER ;

SELECT getTotalPaids(2);

DELIMITER $$

	CREATE OR REPLACE FUNCTION getTotalDue(id_user INT)
	RETURNS DECIMAL
		BEGIN
			RETURN (SELECT (getTotalDebt(id_user) - getTotalPaids(id_user)));
		END$$

DELIMITER ;

SELECT getTotalDue(2);

DELIMITER $$

	CREATE OR REPLACE FUNCTION getGeneralDebt()
	RETURNS DECIMAL
		BEGIN
			RETURN (SELECT SUM(getTotalDebt(users.id)) FROM users);
		END$$

DELIMITER ;

SELECT getGeneralDebt();

DELIMITER $$

	CREATE OR REPLACE FUNCTION getGeneralPaids()
	RETURNS DECIMAL
		BEGIN
			RETURN (SELECT SUM(getTotalPaids(users.id)) FROM users);
		END$$

DELIMITER ;

SELECT getGeneralPaids();

DELIMITER $$

	CREATE OR REPLACE FUNCTION getGeneralDue()
	RETURNS DECIMAL
		BEGIN
			RETURN (SELECT (getGeneralDebt() - getGeneralPaids()));
		END$$

DELIMITER ;

SELECT getGeneralDue();

CREATE USER '1234554321'@'%' IDENTIFIED BY 'qweRty789';
GRANT USAGE ON *.* TO '1234554321'@'%';
GRANT SELECT, DELETE, INSERT, UPDATE  ON ng_Control.* TO '1234554321'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR '1234554321'@'%';
