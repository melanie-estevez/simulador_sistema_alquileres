# simulador_sistema_alquileres

#  26
mkdir -p examen3/alquiler/{backend,frontend,movil,docs}
tree examen

# 27
cd ~/examen/alquiler
pwd
ls
ls -la

# 28
cd docs
touch alquiler_comandos.txt
date > evidencia.txt
who >> evidencia.txt
ls -la >> evidencia.txt
cat evidencia.txt

# 29

cat << EOF > alquiler_comandos.txt
# Sistema de Alquiler - Backend
GET /api/properties/
GET /api/rentals/
POST /api/rentals/
DELETE /api/rentals/30/
INFO: rental created successfully
INFO: rentals service active
WARN: rentals delay detected
EOF

cat alquiler_comandos.txt
grep rentals alquiler_comandos.txt
grep -n rentals alquiler_comandos.txt

# 30

cd ~/examen/alquiler

touch backend/README.md
find . -name "README.md"

cp docs/evidencia.txt docs/evidencia_backup.txt
mv docs/evidencia_backup.txt backend/
ls -la backend
----------------------------
mkdir shared_alquiler
chmod 1777 shared_alquiler
ls -ld shared_alquiler

# 1
sudo -u postgres psql
CREATE USER vehiculos_user WITH PASSWORD 'Admin1234!';
CREATE DATABASE vehiculos_db OWNER vehiculos_user;

# 2
\c vehiculos_db

ALTER SCHEMA public OWNER TO vehiculos_user;
GRANT ALL ON SCHEMA public TO vehiculos_user;
GRANT CREATE ON SCHEMA public TO vehiculos_user;

ALTER DEFAULT PRIVILEGES FOR USER vehiculos_user IN SCHEMA public
GRANT ALL ON TABLES TO vehiculos_user;

ALTER DEFAULT PRIVILEGES FOR USER vehiculos_user IN SCHEMA public
GRANT ALL ON SEQUENCES TO vehiculos_user;

ALTER DEFAULT PRIVILEGES FOR USER vehiculos_user IN SCHEMA public
GRANT ALL ON FUNCTIONS TO vehiculos_user;

# 3
\q
psql -U backend_user -d rentals_db -h 127.0.0.1

# 9
mongosh
use rentals_logs


# 10
db.createUser({
  user: "mongo_backend_user",
  pwd: "exa_2026_ute",
  roles: [{ role: "readWrite", db: "rentals_logs" }]
})

# 11
db.createCollection("fleet_logs")
db.createCollection("rental_events")

# 12
db.rental_events.createIndex({ rental_id: 1 })
db.rental_events.getIndexes()

#--15--
hacer startproject y startapp y todo el back 

# 16
migraciones

# 17 
cap de app corriendo

# 4
\dt postgres

# 5 
\d cada tabla

# 6
CREATE INDEX idx_rental_status
ON rentals_rental(status);
\d rentals_rental

# 7
CREATE VIEW vw_active_rentals AS
SELECT *
FROM rentals_rental
WHERE status IN ('reservado', 'activo');
SELECT * FROM vw_active_rentals;

# 8
CREATE OR REPLACE FUNCTION total_reservas_por_estado(p_estado VARCHAR)
RETURNS BIGINT
AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM cinema_reservation
        WHERE status = p_estado
    );
END;
$$ LANGUAGE plpgsql;

SELECT total_reservas_por_estado('reservado');

# 13
db.rental_events.find({ rental_id: 3 })

# 14
db.rental_events.find({
  created_at: {
    $gte: ISODate("2026-08-17T00:00:00Z"),
    $lt: ISODate("2026-08-18T00:00:00Z")
  }
})

# 20 - ejecucion de react V.C
# 21- API Consumida
# 22 -Creacion y actualizacion

#23 movil creado
#24 emuladoor login
#25 lista de api NoSql