"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const leetCodeChartConfig = {
  easy: {
    label: "Easy",
    color: "hsl(var(--chart-1))", // Green
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))", // Yellow
  },
  hard: {
    label: "Hard",
    color: "hsl(var(--chart-3))", // Red
  },
} satisfies ChartConfig;

interface LeetCodePieChartProps {
  easy: number;
  medium: number;
  hard: number;
}

export function LeetCodePieChart({ easy, medium, hard }: LeetCodePieChartProps) {
  const chartData = [
    { difficulty: "easy", count: easy, fill: "var(--leetcode-easy)" },
    { difficulty: "medium", count: medium, fill: "var(--leetcode-medium)" },
    { difficulty: "hard", count: hard, fill: "var(--leetcode-hard)" },
  ];

  const totalSolved = easy + medium + hard;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>LeetCode Progress</CardTitle>
        <CardDescription>Problems Solved</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={leetCodeChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="difficulty"
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
                          {totalSolved.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Problems
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground flex text-center">
          Easy: {easy}, Medium: {medium}, Hard: {hard}
        </div>
      </CardFooter>
    </Card>
  );
}