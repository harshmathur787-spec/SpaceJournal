import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { UserRound, Sparkles, ChevronDown, Search } from "lucide-react";
import { birthDataSchema, type BirthData, type LocationResult, type NatalChart } from "@shared/schema";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface BirthFormProps {
  onChartCalculated: (chart: NatalChart) => void;
}

export default function BirthForm({ onChartCalculated }: BirthFormProps) {
  const { toast } = useToast();
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");

  const form = useForm<BirthData>({
    resolver: zodResolver(birthDataSchema),
    defaultValues: {
      name: "",
      birthDate: "1990-08-15",
      birthTime: "14:30",
      birthLocation: "",
      latitude: 0,
      longitude: 0,
      timezone: "",
      houseSystem: "placidus",
      orbSize: "normal",
    },
  });

  // Location search query
  const { data: locations = [] } = useQuery({
    queryKey: ["/api/locations/search", locationQuery],
    queryFn: async () => {
      if (!locationQuery.trim()) return [];
      const res = await fetch(`/api/locations/search?query=${encodeURIComponent(locationQuery)}`);
      if (!res.ok) throw new Error("Failed to search locations");
      const data = await res.json();
      return data.locations as LocationResult[];
    },
    enabled: locationQuery.length > 2,
  });

  // Chart calculation mutation
  const calculateChartMutation = useMutation({
    mutationFn: async (data: BirthData) => {
      const res = await apiRequest("POST", "/api/calculate-chart", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        onChartCalculated(data.chart);
        toast({
          title: "Chart Calculated",
          description: "Your natal chart has been successfully calculated!",
        });
      } else {
        toast({
          title: "Calculation Failed",
          description: data.error || "Failed to calculate chart",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to calculate chart",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BirthData) => {
    calculateChartMutation.mutate(data);
  };

  const handleLocationSelect = (location: LocationResult) => {
    form.setValue("birthLocation", location.name);
    form.setValue("latitude", location.latitude);
    form.setValue("longitude", location.longitude);
    form.setValue("timezone", location.timezone);
    setLocationOpen(false);
    setLocationQuery("");
  };

  return (
    <div className="gradient-border" data-testid="birth-form">
      <div className="p-6">
        <h2 className="text-xl font-serif font-semibold mb-6 flex items-center">
          <UserRound className="w-5 h-5 text-primary mr-3" />
          Birth Information
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      data-testid="input-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Input */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      data-testid="input-birth-date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Input */}
            <FormField
              control={form.control}
              name="birthTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      data-testid="input-birth-time"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">If unknown, 12:00 PM will be used</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Input */}
            <FormField
              control={form.control}
              name="birthLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Location</FormLabel>
                  <FormControl>
                    <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          data-testid="input-location"
                          className="w-full justify-between"
                        >
                          {field.value || "City, State, Country"}
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search for a city..."
                            value={locationQuery}
                            onValueChange={setLocationQuery}
                          />
                          <CommandEmpty>No locations found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                key={`${location.latitude}-${location.longitude}`}
                                onSelect={() => handleLocationSelect(location)}
                                data-testid={`location-option-${location.name}`}
                              >
                                {location.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Advanced Settings */}
            <details className="mt-6">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Advanced Settings
              </summary>
              <div className="mt-4 space-y-4 pl-4 border-l border-border">
                {/* House System */}
                <FormField
                  control={form.control}
                  name="houseSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House System</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-house-system">
                            <SelectValue placeholder="Select house system" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="placidus">Placidus</SelectItem>
                          <SelectItem value="koch">Koch</SelectItem>
                          <SelectItem value="equal">Equal House</SelectItem>
                          <SelectItem value="whole">Whole Sign</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Orbs */}
                <FormField
                  control={form.control}
                  name="orbSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aspect Orbs</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-orb-size">
                            <SelectValue placeholder="Select orb size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tight">Tight (6°)</SelectItem>
                          <SelectItem value="normal">Normal (8°)</SelectItem>
                          <SelectItem value="wide">Wide (10°)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </details>

            {/* Calculate Button */}
            <Button
              type="submit"
              data-testid="button-calculate-chart"
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              disabled={calculateChartMutation.isPending}
            >
              {calculateChartMutation.isPending ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Calculating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Calculate Natal Chart
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
