CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE bitcoin_address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE FUNCTION update_modified_column() RETURNS TRIGGER AS $$ BEGIN NEW.modified_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER update_modified BEFORE
UPDATE ON bitcoin_address FOR EACH ROW EXECUTE FUNCTION update_modified_column();
-- Seed bitcoin_address for testing e2e integration
INSERT INTO bitcoin_address (address)
VALUES ('3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd');