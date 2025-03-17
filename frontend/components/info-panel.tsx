"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function InfoPanel() {
  const [activeTab, setActiveTab] = useState("algorithms")

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Educational Resources</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="algorithms" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="terrain">Mars Terrain</TabsTrigger>
            <TabsTrigger value="missions">AI Missions</TabsTrigger>
          </TabsList>

          <TabsContent value="algorithms" className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="a-star">
                <AccordionTrigger>A* Algorithm</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    A* is an informed search algorithm that combines the advantages of Dijkstra's algorithm (favoring
                    vertices close to the starting point) and greedy best-first search (favoring vertices close to the
                    goal). It uses a heuristic function to estimate the cost from the current node to the goal.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A* is optimal if the heuristic function is admissible, meaning it never overestimates the actual
                    cost to reach the goal.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dijkstra">
                <AccordionTrigger>Dijkstra's Algorithm</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Dijkstra's algorithm finds the shortest path between nodes in a graph. It works by visiting vertices
                    in order of increasing distance from the source, and for each vertex, it relaxes all outgoing edges.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Unlike A*, Dijkstra's algorithm explores in all directions, making it less efficient but guaranteed
                    to find the shortest path if one exists.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rrt">
                <AccordionTrigger>RRT Algorithm</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Rapidly-exploring Random Tree (RRT) is an algorithm designed to efficiently search high-dimensional
                    spaces by randomly building a space-filling tree. It works by incrementally building a tree by
                    randomly sampling points and connecting them to the nearest existing node.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    RRT is particularly useful for robotic path planning in complex environments with obstacles, as it
                    can quickly find feasible paths without getting stuck in local minima.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="neural">
                <AccordionTrigger>Neural Network Navigation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Neural network-based navigation uses machine learning to train a model that can predict the best
                    path based on terrain features and past experiences. These approaches can adapt to new environments
                    and learn from previous navigation attempts.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Unlike traditional algorithms, neural networks can incorporate complex terrain features, dynamic
                    obstacles, and even learn from human demonstrations to improve performance over time.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="terrain" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Available Terrain Options</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium">Martian Highlands</h4>
                    <p className="text-sm text-muted-foreground">
                      The southern highlands of Mars are characterized by ancient, cratered terrain with varying elevations. 
                      This region features complex topography with numerous impact craters, making it a challenging environment 
                      for navigation and exploration.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Valles Marineris</h4>
                    <p className="text-sm text-muted-foreground">
                      The largest canyon system in the solar system, Valles Marineris stretches over 4,000 km long and 
                      reaches depths of up to 7 km. This terrain features steep cliffs, landslides, and complex geological 
                      formations, presenting unique challenges for rover navigation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Olympus Mons</h4>
                    <p className="text-sm text-muted-foreground">
                      The largest volcano in the solar system, Olympus Mons rises 21.9 km above the Martian surface. 
                      This terrain includes gentle slopes, caldera features, and surrounding lava plains, offering a 
                      different set of navigation challenges compared to other Martian regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="missions" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Mars Rover Missions</h3>
                <p className="text-sm text-muted-foreground">
                  Several Mars rover missions have employed AI for navigation:
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  <li>Sojourner (1997): Basic obstacle avoidance</li>
                  <li>Spirit & Opportunity (2004): Enhanced autonomous navigation</li>
                  <li>Curiosity (2012): Advanced hazard detection and path planning</li>
                  <li>Perseverance (2021): Enhanced autonomous navigation with AI-powered hazard avoidance</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Future AI Applications</h3>
                <p className="text-sm text-muted-foreground">
                  Future Mars missions are expected to incorporate more advanced AI capabilities:
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  <li>Swarm robotics for collaborative exploration</li>
                  <li>Real-time terrain adaptation and learning</li>
                  <li>Predictive maintenance and self-repair</li>
                  <li>Autonomous science target identification</li>
                  <li>Human-robot collaborative missions</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}