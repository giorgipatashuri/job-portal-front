import React, { useContext, useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";

function Summary({ enabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext<any>(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-green border-t-4 mt-10">
        <h2 className="font-bold text-lg">ჩემს შესახებ</h2>
        {/* <p>Add summary for your job title</p> */}

        <form className="mt-7">
          {/* <div className="flex justify-between items-end">
            <label>Add summary</label>
            <Button
              variant="outline"
              onClick={() => GeneratesummaryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div> */}
          <Textarea
            className="mt-5"
            required
            value={summary}
            defaultValue={summary ? summary : resumeInfo?.summary}
            onChange={(e: any) => setSummary(e.target.value)}
          />
        </form>
      </div>

      {/* {aiGeneratedsummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedsummaryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setsummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default Summary;
