"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/app/components/common/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Textarea from "@/app/components/common/Textarea";
import useVenue from "@/app/hooks/useVenue";
import { updateVenue, deleteVenue } from "@/api/venues";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/Dialog/Dialog";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  city: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
  address: z.string().optional(),
  price: z.number().min(0, {
    message: "Price must be a non-negative number.",
  }),
  maxGuests: z
    .number()
    .int()
    .min(1, {
      message: "Max guests must be at least 1.",
    })
    .max(50, {
      message: "Max guests cannot exceed 50.",
    }),
});

interface EditVenueFormProps {
  venueId: string;
  onSuccess?: () => void;
}

export default function EditVenueForm({
  venueId,
  onSuccess,
}: EditVenueFormProps) {
  const { data: venue, isLoading, isError } = useVenue(venueId);
  const queryClient = useQueryClient();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      city: "",
      country: "",
      zip: "",
      address: "",
      price: 0,
      maxGuests: 1,
    },
  });

  useEffect(() => {
    if (venue) {
      form.reset({
        name: venue.name,
        description: venue.description,
        city: venue.location?.city || "",
        country: venue.location?.country || "",
        zip: venue.location?.zip || "",
        address: venue.location?.address || "",
        price: venue.price,
        maxGuests: venue.maxGuests,
      });
    }
  }, [venue, form]);

  const updateVenueMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      updateVenue(venueId, {
        name: values.name,
        description: values.description,
        price: values.price,
        maxGuests: values.maxGuests,
        location: {
          city: values.city || undefined,
          country: values.country || undefined,
          zip: values.zip || undefined,
          address: values.address || undefined,
        },
      }),
    onSuccess: () => {
      setSuccessMessage("Venue updated successfully!");
      setUpdateError(null);
      queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      setUpdateError(`Update failed: ${error.message || "Unknown error"}`);
      setSuccessMessage(null);
    },
  });

  const deleteVenueMutation = useMutation({
    mutationFn: () => deleteVenue(venueId),
    onSuccess: () => {
      setSuccessMessage("Venue deleted successfully!");
      setDeleteError(null);
      setIsDeleteDialogOpen(false);
      window.location.href = "/";
    },
    onError: (error) => {
      console.error(error);
      setDeleteError(`Delete failed: ${error.message || "Unknown error"}`);
      setSuccessMessage(null);
      setIsDeleteDialogOpen(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateVenueMutation.mutate(values);
  }

  if (isLoading) {
    return <div>Loading venue data...</div>;
  }

  if (isError || !venue) {
    return <div>Error loading venue data or venue not found.</div>;
  }

  return (
    <>
      <div className="my-5">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}
        {updateError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {updateError}
          </div>
        )}
        {deleteError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {deleteError}
          </div>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mt-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter venue name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter venue description"
                    {...field}
                    rows={8}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Night</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Guests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter maximum guests"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : parseInt(value, 10));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter zip code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="submit"
              disabled={updateVenueMutation.isPending}
              label={
                updateVenueMutation.isPending ? "Saving..." : "Save Changes"
              }
            />
            <Button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={deleteVenueMutation.isPending}
              variant="outline"
              label={
                deleteVenueMutation.isPending ? "Deleting..." : "Delete Venue"
              }
            />
          </div>
        </form>
      </Form>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this venue?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              venue and remove its data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              label="Cancel"
            />
            <Button
              type="button"
              variant="destructive"
              className="text-white"
              onClick={() => deleteVenueMutation.mutate()}
              disabled={deleteVenueMutation.isPending}
              label={
                deleteVenueMutation.isPending ? "Deleting..." : "Confirm Delete"
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
