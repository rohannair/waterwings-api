CREATE TABLE "users" (
	"ID" integer NOT NULL,
	"lastName" VARCHAR(255) NOT NULL,
	"firstName" VARCHAR(255) NOT NULL,
	"companyID" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"joined" DATETIME NOT NULL,
	"phoneNumber" integer NOT NULL,
	"hardwarePackageID" integer NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "companies" (
	"ID" integer NOT NULL,
	"name" VARCHAR(255) NOT NULL UNIQUE,
	"address" VARCHAR(255) NOT NULL UNIQUE,
	"country" VARCHAR(2) NOT NULL DEFAULT 'CA',
	"province" VARCHAR(2) NOT NULL DEFAULT 'ON',
	"phoneNumber" integer NOT NULL UNIQUE DEFAULT 'ON',
	"adminID" integer UNIQUE DEFAULT 'ON',
	CONSTRAINT companies_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"ID" integer NOT NULL UNIQUE,
	"manufacturer" VARCHAR(255) NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"vendor" VARCHAR(255) NOT NULL,
	"SKU" VARCHAR(255) NOT NULL UNIQUE,
	"MPN" VARCHAR(255) UNIQUE,
	"UPC" VARCHAR(12) UNIQUE,
	CONSTRAINT products_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "packages" (
	"ID" VARCHAR(255) NOT NULL UNIQUE,
	"computerID" VARCHAR(255) NOT NULL,
	"ramQuantity" integer NOT NULL,
	"mouseID" VARCHAR(255),
	"keyboardID" VARCHAR(255),
	"monitorID" VARCHAR(255),
	"monitorQuantity" integer,
	CONSTRAINT packages_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "productTypes" (
	"ID" integer NOT NULL,
	"name" VARCHAR(255) NOT NULL UNIQUE,
	"isSoftware" BOOLEAN NOT NULL,
	CONSTRAINT productTypes_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY (companyID) REFERENCES companies(ID);
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY (hardwarePackageID) REFERENCES packages(ID);

ALTER TABLE "companies" ADD CONSTRAINT "companies_fk0" FOREIGN KEY (adminID) REFERENCES users(ID);

ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY (manufacturer) REFERENCES companies();
ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY (type) REFERENCES productTypes(ID);

ALTER TABLE "packages" ADD CONSTRAINT "packages_fk0" FOREIGN KEY (computerID) REFERENCES products(ID);
ALTER TABLE "packages" ADD CONSTRAINT "packages_fk1" FOREIGN KEY (mouseID) REFERENCES products(ID);
ALTER TABLE "packages" ADD CONSTRAINT "packages_fk2" FOREIGN KEY (keyboardID) REFERENCES products(ID);
ALTER TABLE "packages" ADD CONSTRAINT "packages_fk3" FOREIGN KEY (monitorID) REFERENCES products(ID);


