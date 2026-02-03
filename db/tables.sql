CREATE TABLE members (
  member_id UUID PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'gardener', 'visitor'))
);

CREATE TABLE plots (
  plot_id UUID PRIMARY KEY,
  size INT NOT NULL,
  status VARCHAR(10) NOT NULL CHECK (status IN ('available', 'occupied')),
  leased_on DATE,
  lease_expiry DATE,
  current_member_id UUID REFERENCES members(member_id)
);

CREATE TABLE waitlist (
  queue_id UUID PRIMARY KEY,
  plot_id UUID REFERENCES plots(plot_id),
  member_id UUID NOT NULL REFERENCES members(member_id),
  UNIQUE(plot_id, member_id)
);