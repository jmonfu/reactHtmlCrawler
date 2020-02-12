    // Get the absolute path
    function getPath()
    {
        var path = document.location;
        var str = new String(path);
        var end = str.lastIndexOf("/");
        var absolutePath = str.substring(8,end)+"/";
        absolutePath=absolutePath.replace(/%20/g," ");
        return absolutePath;
    }
    function Navigate()
    {
        var myxmldoc=new ActiveXObject("Msxml2.DOMDocument.4.0");
        var i;
        myxmldoc.async=false;
        myxmldoc.load("emp.xml");
        if(myxmldoc.readyState==4 && myxmldoc.parseError.errorCode==0)
        {
            var root=myxmldoc.documentElement;
            var elem=myxmldoc.createElement("dept");
            elem.text="Mktg";
            root.childNodes.item(0).insertBefore(elem,root.childNodes.item(0).lastChild);
            var newEmp=myxmldoc.createElement("emp");
            root.appendChild(newEmp);
            var empName=myxmldoc.createElement("empname");
            empName.text="Tom Norton";
            newEmp.appendChild(empName);
            var empCity=myxmldoc.createElement("empcity");
            empCity.text="Boston";
            newEmp.appendChild(empCity);


            var newEmp=myxmldoc.createElement("emp");
            root.appendChild(newEmp);
            var empName=myxmldoc.createElement("empname");
            empName.text="Mary";
            newEmp.appendChild(empName);
            var empCity=myxmldoc.createElement("empcity");
            empCity.text="Paris";
            newEmp.appendChild(empCity);





            alert(myxmldoc.xml);
            //save document from memory to filename on disk
            var OutputXML=myxmldoc.xml;
            var absPath = getPath();

            mfObject = new ActiveXObject("Scripting.FileSystemObject");
            NewSampleFile = mfObject.CreateTextFile(absPath+"sample.xml", true);
            NewSampleFile.write(OutputXML);
            NewSampleFile.close();      


        }
        else
        {
            alert("Failed to load the document.Check whether your XML document is well-formed");
        }
    }
