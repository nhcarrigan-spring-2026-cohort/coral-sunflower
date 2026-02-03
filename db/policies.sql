CREATE POLICY "Admins full access on members"
ON public.members
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.members WHERE member_id = auth.uid()::uuid AND role = 'admin'
    )
  )
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.members WHERE member_id = auth.uid()::uuid AND role = 'admin'
  )
);

CREATE POLICY "Admins full access on plots"
ON public.plots
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.members WHERE member_id = auth.uid()::uuid AND role = 'admin'
    )
  )
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.members WHERE member_id = auth.uid()::uuid AND role = 'admin'
  )
);

CREATE POLICY "Admins full access on waitlist"
ON public.waitlist
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.members WHERE member_id = auth.uid()::uuid AND role = 'admin'
    )
  )
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.members WHERE member_id = auth.uid()::uuid AND role = 'admin'
  )
);

CREATE POLICY "Enable gardeners to view their own data only"
ON public.members
FOR SELECT
TO authenticated
USING (
  auth.uid() = member_id AND role = 'gardener'
);

CREATE POLICY "Enable visitors to available plot"
ON public.plots
FOR SELECT
TO public
USING (
  status = 'available'
);