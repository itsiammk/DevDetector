"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  visitors: {
    label: "Available",
  },
  chrome: {
    label: "Unavailable",
    color: "hsl(var(--chart-5))",
  },
  safari: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  
} satisfies ChartConfig

export function PieChartComponent({totalCount}: {totalCount: number}) {
    const chartData = [
        { browser: "chrome", visitors: (20-totalCount), fill: "var(--color-chrome)" },
        { browser: "safari", visitors: totalCount, fill: "var(--color-safari)" },
      ]
  const totalVisitors = totalCount

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Profile Available</CardTitle>
        <CardDescription>Across Platforms</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Profiles
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total 20 Platforms <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground flex text-center ">
          User Available on {totalCount} Platforms.
        </div>
      </CardFooter>
    </Card>
  )
}
