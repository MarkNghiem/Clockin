CREATE TRIGGER set_update_at_users
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_update_at_companies
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_update_at_employees
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER delete_old_and_inactive_employees
AFTER INSERT OR UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.delete_inactive_5_years_employees();