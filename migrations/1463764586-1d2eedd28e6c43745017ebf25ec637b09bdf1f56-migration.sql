-- Migration - Fri 20 May 2016

-- SQL Function to check availabililty of a subdomain
CREATE FUNCTION check_subdomain_availability (new_subdomain text) RETURNS boolean AS $$
BEGIN
RETURN (SELECT EXISTS(SELECT 1 from companies where subdomain = new_subdomain));
END
$$ LANGUAGE plpgsql;
