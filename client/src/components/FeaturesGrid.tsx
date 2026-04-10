import React from 'react'
import { Card,CardHeader, CardTitle, CardContent  } from "./ui/Card";
import { Briefcase, MapPin, Search, Star, Calendar } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const FeaturesGrid = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Job Search */}
          <Card className="group hover:shadow-lg transition-shadow duration-300 min-h-[250px] flex flex-col justify-between">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="h-7 w-7 text-indigo-400" />
              </div>
              <CardTitle className="text-xl mb-2">Easy Job Search</CardTitle>
              <p className="text-gray-600">
                Advanced filters to find the perfect job matching your skills and schedule
              </p>
            </CardHeader>
          </Card>

          {/* Application Tracking */}
          <Card className="group hover:shadow-lg transition-shadow duration-300 min-h-[250px] flex flex-col justify-between">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-7 w-7 text-indigo-400" />
              </div>
              <CardTitle className="text-xl mb-2">Track Applications</CardTitle>
              <p className="text-gray-600">
                Monitor your applications and stay updated on their status
              </p>
            </CardHeader>
          </Card>

          {/* Interview Scheduling */}
          <Card className="group hover:shadow-lg transition-shadow duration-300 min-h-[250px] flex flex-col justify-between">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-indigo-400" />
              </div>
              <CardTitle className="text-xl mb-2">Schedule Interviews</CardTitle>
              <p className="text-gray-600">
                Easily manage interview schedules and availability
              </p>
            </CardHeader>
          </Card>
        </div>
  )
}

export default FeaturesGrid