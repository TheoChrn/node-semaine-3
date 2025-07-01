CREATE TABLE "furniture_materials" (
	"furniture_id" uuid NOT NULL,
	"material_id" uuid NOT NULL,
	CONSTRAINT "furniture_materials_furniture_id_material_id_pk" PRIMARY KEY("furniture_id","material_id")
);
--> statement-breakpoint
ALTER TABLE "furniture_materials" ADD CONSTRAINT "furniture_materials_furniture_id_furnitures_id_fk" FOREIGN KEY ("furniture_id") REFERENCES "public"."furnitures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "furniture_materials" ADD CONSTRAINT "furniture_materials_material_id_raw_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."raw_materials"("id") ON DELETE cascade ON UPDATE no action;