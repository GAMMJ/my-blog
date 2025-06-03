import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, Download } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">김민재</h1>
          <p className="text-xl text-muted-foreground mb-6">프론트엔드 개발자</p>
          <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>gammjmj@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>010-2362-8965</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>포항, 대한민국</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              PDF 다운로드
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>소개</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                현재 대학교를 다니며 프론트를 공부하고 있는 중 입니다. React, Next.js, Node.js를 주로 사용하며, 사용자
                경험과 성능 최적화에 관심이 많습니다. 새로운 기술을 배우고 팀과 지식을 공유하는 것을 즐깁니다.
              </p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>기술 스택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Sass"].map(
                      (skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "NestJS", "Python", "Django", "PostgreSQL", "MongoDB", "Redis"].map(
                      (skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "AWS", "Vercel", "Git", "GitHub Actions", "Jest", "Cypress", "Figma"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          {/* <Card>
            <CardHeader>
              <CardTitle>경력</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="font-semibold text-lg">시니어 프론트엔드 개발자</h3>
                  <span className="text-muted-foreground">2022.03 - 현재</span>
                </div>
                <p className="text-primary font-medium mb-2">테크 스타트업 A</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>React 기반 웹 애플리케이션 개발 및 유지보수</li>
                  <li>Next.js를 활용한 SSR/SSG 구현으로 성능 30% 향상</li>
                  <li>TypeScript 도입으로 코드 품질 및 개발 생산성 향상</li>
                  <li>주니어 개발자 멘토링 및 코드 리뷰</li>
                </ul>
              </div>

              <div className="border-l-2 border-muted pl-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="font-semibold text-lg">풀스택 개발자</h3>
                  <span className="text-muted-foreground">2020.01 - 2022.02</span>
                </div>
                <p className="text-primary font-medium mb-2">웹 에이전시 B</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>다양한 클라이언트 프로젝트의 프론트엔드 및 백엔드 개발</li>
                  <li>React, Vue.js를 활용한 SPA 개발</li>
                  <li>Node.js, Express를 이용한 RESTful API 개발</li>
                  <li>AWS를 활용한 배포 및 인프라 관리</li>
                </ul>
              </div>

              <div className="border-l-2 border-muted pl-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="font-semibold text-lg">주니어 웹 개발자</h3>
                  <span className="text-muted-foreground">2019.03 - 2019.12</span>
                </div>
                <p className="text-primary font-medium mb-2">소프트웨어 회사 C</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>HTML, CSS, JavaScript를 활용한 웹사이트 개발</li>
                  <li>jQuery 기반 인터랙티브 웹 페이지 구현</li>
                  <li>반응형 웹 디자인 구현</li>
                </ul>
              </div>
            </CardContent>
          </Card> */}

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>학력</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-semibold">전자공학과 &amp; 컴퓨터공학과 학사</h3>
                    <span className="text-muted-foreground">2021.03 - 2027.02</span>
                  </div>
                  <p className="text-primary font-medium">국립경국대학교</p>
                  <p className="text-muted-foreground">GPA: 4.3/4.5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          {/* <Card>
            <CardHeader>
              <CardTitle>주요 프로젝트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">E-커머스 플랫폼</h3>
                <p className="text-muted-foreground mb-2">Next.js와 Stripe를 활용한 온라인 쇼핑몰 개발</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>SSR을 활용한 SEO 최적화</li>
                  <li>결제 시스템 통합</li>
                  <li>관리자 대시보드 구현</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">실시간 채팅 애플리케이션</h3>
                <p className="text-muted-foreground mb-2">Socket.io를 활용한 실시간 메시징 플랫폼</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["React", "Node.js", "Socket.io", "MongoDB", "Redis"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>실시간 메시지 전송</li>
                  <li>파일 업로드 기능</li>
                  <li>사용자 인증 및 권한 관리</li>
                </ul>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  )
}
