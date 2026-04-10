import React from 'react'
import { Card,CardHeader, CardTitle, CardContent  } from "./ui/Card";
import { Briefcase, MapPin, Search, Star, Calendar } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";


const HeroSearch = () => {
  return (
    <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Job title, keywords, or company"
                    className="w-full bg-white pl-10"
                  />
                </div>
                <div className="flex-1  relative ">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 = text-gray-400" />
                  <Input 
                    placeholder="Location"
                    className="w-full bg-white pl-10"
                  />
                </div>
                
                <Button className="bg-indigo-300 hover:bg-indigo-500">
                  Search Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
  )
}

export default HeroSearch