CREATE TABLE public.people (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "title" varchar,
  "status" varchar,
  "wage" numeric(10, 2) NOT NULL,
  "total_hrs" numeric(10, 2),
  "company" varchar,
  CONSTRAINT "people_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

INSERT INTO public.people VALUES (1, 'Mark', 'Resident', 'Full-time', 70.00, 80.00, 'FTRI-51');
INSERT INTO public.people VALUES (2, 'Ayleen', 'Resident', 'Full-time', 80.00, 100.00, 'FTRI-51');
INSERT INTO public.people VALUES (3, 'Claire', 'Resident', 'Full-time', 65.00, 70.00, 'FTRI-51');
INSERT INTO public.people VALUES (4, 'Ellie', 'Resident', 'Full-time', 80.00, 60.00, 'FTRI-51');
INSERT INTO public.people VALUES (5, 'Funan', 'Resident', 'Full-time', 75.00, 80.00, 'FTRI-51');
INSERT INTO public.people VALUES (6, 'Garrett', 'Resident', 'Full-time', 80.00, 60.00, 'FTRI-51');
INSERT INTO public.people VALUES (7, 'Ian', 'Resident', 'Full-time', 85.00, 90.00, 'FTRI-51');
INSERT INTO public.people VALUES (8, 'Jeet', 'Resident', 'Full-time', 70.00, 80.00, 'FTRI-51');
INSERT INTO public.people VALUES (9, 'Noah', 'Resident', 'Full-time', 65.00, 60.00, 'FTRI-51');
INSERT INTO public.people VALUES (10, 'Patrice', 'Resident', 'Full-time', 70.00, 80.00, 'FTRI-51');