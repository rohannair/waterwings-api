-- Migrating playbooks assigned to users
INSERT INTO playbook_joins(playbook_id, user_id, role_id)
  SELECT p.id AS playbook_id, p.assigned AS user_id, u.role_id
  FROM playbooks p
  LEFT JOIN users u on p.assigned = u.id;
