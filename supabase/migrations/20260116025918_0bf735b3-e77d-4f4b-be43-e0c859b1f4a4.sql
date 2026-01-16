-- Add explicit SELECT deny policy for subscribers table to prevent email harvesting
CREATE POLICY "No one can read subscribers"
ON public.subscribers FOR SELECT
USING (false);

-- Add explicit UPDATE deny policy for subscribers table
CREATE POLICY "No one can update subscribers"
ON public.subscribers FOR UPDATE
USING (false);

-- Add explicit DELETE deny policy for subscribers table
CREATE POLICY "No one can delete subscribers"
ON public.subscribers FOR DELETE
USING (false);