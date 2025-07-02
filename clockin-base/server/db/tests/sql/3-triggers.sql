CREATE TRIGGER set_update_at_users
BEFORE UPDATE ON test.users
FOR EACH ROW
EXECUTE FUNCTION test.update_updated_at_column();

CREATE TRIGGER set_update_at_companies
BEFORE UPDATE ON test.companies
FOR EACH ROW
EXECUTE FUNCTION test.update_updated_at_column();

CREATE TRIGGER set_update_at_employees
BEFORE UPDATE ON test.employees
FOR EACH ROW
EXECUTE FUNCTION test.update_updated_at_column();

CREATE TRIGGER delete_old_and_inactive_employees
AFTER INSERT OR UPDATE ON test.employees
FOR EACH ROW
EXECUTE FUNCTION test.delete_inactive_5_years_employees();