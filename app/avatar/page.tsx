import { uploadAvatar } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div>
      <form action={uploadAvatar}>
        <div className="grid w-full max-w-sm items-center gap-1.5"></div>
        <Label htmlFor="picture">Picutre</Label>
        <Input name="avatar" id="picture" type="file" />
        <Button>Upload</Button>
      </form>
    </div>
  )
}
