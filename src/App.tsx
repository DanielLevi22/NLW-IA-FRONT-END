import { Github,Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/VideoInputForm.1";
import { PromptSelect } from "./components/promptSelect";
import { useState } from 'react'
import { useCompletion } from 'ai/react'


export function App() {
 const [ temperature, setTemperature ] = useState(0.5)
 const [ videoId, setVideoId ] = useState<string | null >(null)

 

  const { input, setInput,handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm  text-muted-foreground"  >
            Desenvolvido com ❤️ Nlw
          </span>
          <Separator orientation="vertical" className="h-6"/>
          <Button variant="outline">
            <Github  className=" w-4 h-4 mr-2"/>
            GitHub
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">

        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
             placeholder=" Inclua o prompt para a IA"
              className="resize-none p-5 leading-relaxed" 
              value={input}
              onChange={handleInputChange}
           />
            <Textarea 
              placeholder=" Resultado gerado pela IA"
              readOnly 
              className="resize-none p-5 leading-relaxed" 
              value={completion}
             />
          </div>
          <p className="text-sm text-muted-foreground">Lembre-se: voce pode utilizar a variavel <code className="text-violet-500">{"{transcription}"}</code>  no seu prompt para adicionar o conteudo da transcricao do video selecionado.</p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId}/>

          <Separator/>

          <form  className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
              <Label>Prompt</Label>
              
              <PromptSelect onPromptSelected={setInput}/>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5 turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">Voce podera custmizar essa opcao em breve</span>
            </div>


            <Separator /> 
            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider 
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />
             
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais autos tendem a deixar o o resultado mais criativo e com possiveis erros.
              </span>
            </div>

            <Separator />
            <Button disabled={isLoading} type="submit" className="w-full">Executar <Wand2 className="h-4 w-4 ml-2"/></Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
