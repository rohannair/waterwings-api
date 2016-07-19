-- Migration - Mon 11 Jul 2016

ALTER TABLE playbooks
DROP CONSTRAINT playbooks_assigned_fkey,
ADD FOREIGN KEY (assigned) REFERENCES users
  ON UPDATE CASCADE
  ON DELETE RESTRICT;
