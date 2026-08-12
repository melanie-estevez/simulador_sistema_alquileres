CREATE USER manufactura_user WITH PASSWORD 'admin123';
CREATE DATABASE manufactura_db OWNER manufactura_user;

\c manufactura_db

ALTER SCHEMA public OWNER TO manufactura_user;
GRANT ALL ON SCHEMA public TO manufactura_user;
GRANT CREATE ON SCHEMA public TO manufactura_user;

ALTER DEFAULT PRIVILEGES FOR USER manufactura_user IN SCHEMA public
GRANT ALL ON TABLES TO manufactura_user;

ALTER DEFAULT PRIVILEGES FOR USER manufactura_user IN SCHEMA public
GRANT ALL ON SEQUENCES TO manufactura_user;

ALTER DEFAULT PRIVILEGES FOR USER manufactura_user IN SCHEMA public
GRANT ALL ON FUNCTIONS TO manufactura_user;

mkdir manufactura_api
cd manufactura_api
python3 -m venv venv
source venv/bin/activate