CREATE TYPE "public"."companies_enum" AS ENUM('BBois', 'MetaLo', 'pPlastique');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('armoire', 'étagère');--> statement-breakpoint
CREATE TYPE "public"."raw_material_types_value" AS ENUM('bois', 'fer', 'plastique');--> statement-breakpoint
CREATE TYPE "public"."raw_materials_value" AS ENUM('frêne', 'chêne', 'noyer', 'acier', 'inox', 'aluminium', 'plastique');--> statement-breakpoint
CREATE TYPE "public"."role_value" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "companies_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "furniture_materials" (
	"furniture_id" uuid NOT NULL,
	"material_id" uuid NOT NULL,
	CONSTRAINT "furniture_materials_furniture_id_material_id_pk" PRIMARY KEY("furniture_id","material_id")
);
--> statement-breakpoint
CREATE TABLE "furnitures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" varchar(255) NOT NULL,
	"created_by" uuid NOT NULL,
	"type" "type" NOT NULL,
	"keyword" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "raw_material_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" "raw_material_types_value" NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "raw_material_types_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "raw_materials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" "raw_materials_value" NOT NULL,
	"type_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role_value" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "furniture_materials" ADD CONSTRAINT "furniture_materials_furniture_id_furnitures_id_fk" FOREIGN KEY ("furniture_id") REFERENCES "public"."furnitures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "furniture_materials" ADD CONSTRAINT "furniture_materials_material_id_raw_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."raw_materials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "furnitures" ADD CONSTRAINT "furnitures_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw_material_types" ADD CONSTRAINT "raw_material_types_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_type_id_raw_material_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."raw_material_types"("id") ON DELETE cascade ON UPDATE no action;