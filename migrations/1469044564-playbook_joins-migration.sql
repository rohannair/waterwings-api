-- Migration July 20, 2016
CREATE TABLE IF NOT EXISTS playbook_joins (
  id BIGSERIAL PRIMARY KEY,
  playbook_id VARCHAR(50) REFERENCES playbooks ON UPDATE CASCADE,
  user_id VARCHAR(50) REFERENCES users ON UPDATE CASCADE,
  role_id BIGINT REFERENCES roles ON UPDATE CASCADE,
  created_at timestamptz DEFAULT now()
);
